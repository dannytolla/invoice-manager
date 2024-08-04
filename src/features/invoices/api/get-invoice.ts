"use server";
import { validateRequest } from "@/auth";
import prisma from "@/lib/prisma";

interface IParams {
  invoiceId?: string;
}

export async function getInvoiceById(params: IParams) {
  try {
    const { user: currentUser } = await validateRequest();

    if (!currentUser) {
      return null;
    }

    const { invoiceId } = params;
    const invoice = await prisma.invoice.findUnique({
      where: {
        id: invoiceId,
      },
      include: {
        items: true,
      },
    });

    if (!invoice) {
      return null;
    }

    if (invoice.userId !== currentUser.id) {
      return null;
    }

    return invoice;
  } catch (error: any) {
    throw new Error(error);
  }
}
