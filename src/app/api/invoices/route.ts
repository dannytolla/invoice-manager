import { NextResponse } from "next/server";

import prisma from "@/lib/prisma";
import { validateRequest } from "@/auth";

export async function POST(request: Request) {
  const { user: currentUser } = await validateRequest();

  if (!currentUser) {
    return NextResponse.error();
  }

  const body = await request.json();

  const {
    invoiceNumber,
    clientEmail,
    clientName,
    Items,
    description,
    dueDate,
    status,
    city,
  } = body;

  type ObjectProps = keyof typeof body;

  Object.keys(body).forEach((value: ObjectProps) => {
    if (!body[value]) {
      NextResponse.error();
    }
  });

  const total = Items.reduce(
    (acc: number, cur: { name: string; price: string; quantity: string }) =>
      acc + +cur.price * +cur.quantity,
    0
  )
    .toFixed(2)
    .toString();

  const invoice = await prisma.invoice.create({
    data: {
      userId: currentUser.id,
      invoiceNumber,
      clientName,
      clientEmail,
      description: description,
      total: +total,
      status: status,
      dueDate,
      city,
      items: {
        create: [...Items],
      },
    },
  });

  return NextResponse.json({ data: invoice });
}

export async function GET(request: Request) {
  const { user: currentUser } = await validateRequest();

  if (!currentUser) {
    return NextResponse.error();
  }

  const invoices = await prisma.invoice.findMany({
    where: {
      userId: currentUser.id,
    },
    include: {
      items: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return NextResponse.json({ data: invoices });
}
