"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import InvoiceInfo from "./InvoiceInfo";
import { Invoice, Item } from "@prisma/client";

interface InvoiceClientProps {
  invoice: Invoice & { items: Item[] };
}

const InvoiceClient: React.FC<InvoiceClientProps> = ({ invoice }) => {
  return (
    <div className="flex flex-col h-full gap-6 text-sm font-bold text-black mb-10">
      <Link
        href="/"
        className="flex items-center self-start gap-5 p-2 border rounded-md mt-5 md:mx-20"
      >
        <ArrowLeft />
        <span>Go back</span>
      </Link>

      <InvoiceInfo invoice={invoice} />
    </div>
  );
};

export default InvoiceClient;
