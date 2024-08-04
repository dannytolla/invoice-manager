import { NextResponse } from "next/server";

import { Status } from "@prisma/client";
import { validateRequest } from "@/auth";
import prisma from "@/lib/prisma";

interface IParams {
  invoiceId?: string;
}

export async function GET(request: Request, { params }: { params: IParams }) {
  const { user: currentUser } = await validateRequest();

  if (!currentUser) {
    return NextResponse.error();
  }

  const { invoiceId } = params;

  const invoice = await prisma.invoice.findUnique({
    where: {
      id: invoiceId,
      // userId: currentUser.id,
    },
    include: {
      items: true,
    },
  });

  return NextResponse.json({ data: invoice });
}

export async function POST(request: Request, { params }: { params: IParams }) {
  const { user: currentUser } = await validateRequest();

  if (!currentUser) {
    return NextResponse.error();
  }

  const { invoiceId } = params;

  const invoice = await prisma.invoice.updateMany({
    where: {
      id: invoiceId,
      userId: currentUser.id,
    },
    data: {
      status: Status.PAID,
    },
  });

  return NextResponse.json(invoice);
}

export async function PATCH(request: Request, { params }: { params: IParams }) {
  const { user: currentUser } = await validateRequest();

  if (!currentUser) {
    return NextResponse.error();
  }

  const { invoiceId } = params;

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
    (
      acc: number,
      cur: {
        name: string;
        price: string;
        quantity: string;
      }
    ) => acc + +cur.price * +cur.quantity,
    0
  )
    .toFixed(2)
    .toString();

  const invoice = await prisma.invoice.update({
    where: {
      id: invoiceId,
    },
    data: {
      clientName,
      clientEmail,
      // cityTo,
      dueDate,
      invoiceNumber,
      description: description,
      total: +total,
      status: status,
      city,
      items: {
        deleteMany: {},
        create: [...Items],
      },
    },
  });

  return NextResponse.json(invoice);
}

export async function DELETE(
  request: Request,
  { params }: { params: IParams }
) {
  const { user: currentUser } = await validateRequest();

  if (!currentUser) {
    return NextResponse.error();
  }

  const { invoiceId } = params;

  if (!invoiceId || typeof invoiceId !== "string") {
    throw new Error("Invalid ID");
  }

  const invoice = await prisma.invoice.deleteMany({
    where: {
      id: invoiceId,
      userId: currentUser.id,
    },
  });

  return NextResponse.json(invoice);
}
