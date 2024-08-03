"use server";

import { isRedirectError } from "next/dist/client/components/redirect";
import { generateIdFromEntropySize } from "lucia";
import { cookies } from "next/headers";
import { hash } from "@node-rs/argon2";
import { redirect } from "next/navigation";

import { lucia } from "@/auth";
import prisma from "@/lib/prisma";
import { signUpSchema, SignUpValues } from "@/lib/validation";

export async function signUp(
  credentials: SignUpValues
): Promise<{ error: string }> {
  try {
    const { name, email, password } = signUpSchema.parse(credentials);

    const passwordHash = await hash(password, {
      memoryCost: 19456,
      timeCost: 2,
      outputLen: 32,
      parallelism: 1,
    }); // Hash the password

    const userId = generateIdFromEntropySize(10); // Generate a random user ID

    const existingEmail = await prisma.user.findFirst({
      where: {
        email: {
          equals: email,
          mode: "insensitive",
        },
      },
    });

    if (existingEmail) {
      return {
        error: "Email already taken",
      };
    }

    await prisma.user.create({
      data: {
        id: userId,
        name,
        email,
        passwordHash,
      },
    }); // Create the user

    const session = await lucia.createSession(userId, {}); // Create a session
    const sessionCookie = lucia.createSessionCookie(session.id); // Create a session cookie
    cookies().set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes
    );

    return redirect("/"); // Redirect to the home page
  } catch (error) {
    if (isRedirectError(error)) throw error;
    console.error(error);
    return {
      error: "Something went wrong. Please try again.",
    };
  }
}
