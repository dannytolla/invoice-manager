"use client";

import { format } from "date-fns";
import { Invoice, Item } from "@prisma/client";
import InvoiceInfoItemList from "./InvoiceInfoItemList";
import { formatNumber } from "@/lib/utils";

interface InvoiceInfoProps {
  invoice: Invoice & { items: Item[] };
}

const InvoiceInfo: React.FC<InvoiceInfoProps> = ({ invoice }) => {
  return (
    <div className="overflow-y-auto rounded-2xl md:mx-20 border border-slate-100 shadow-xl bg-white dark:bg-[#252945]">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 p-6 rounded-md text-gray-500 font-medium bg-[#f3f5f8] dark:bg-[#1b1d23]">
        {/* Invoice Number and Description */}
        <div className="flex flex-col gap-2">
          <div className="flex flex-col">
            <p className="text-sm">Invoice Number</p>
            <div className="text-base font-bold uppercase text-black">
              <span className="text-[#7E88C3]">#</span>
              {invoice.invoiceNumber.toUpperCase()}
            </div>
          </div>
          <div className="flex flex-col">
            <span className="text-sm">Description</span>
            <span className="text-base font-bold text-primary">
              {invoice.description}
            </span>
          </div>
        </div>

        {/* Invoice Date and Payment Due */}
        <div className="flex flex-col gap-2">
          <div className="flex flex-col">
            <span className="text-sm">Invoice Date</span>
            <span className="text-base font-bold text-primary">
              {format(invoice.createdAt, "dd MMM yyyy")}
            </span>
          </div>
          <div className="flex flex-col">
            <span className="text-sm">Payment Due</span>
            <span className="text-base font-bold text-primary">
              {format(invoice.dueDate, "dd MMM yyyy")}
            </span>
          </div>
        </div>

        {/* Bill To */}
        <div className="flex flex-col ">
          <span className="text-sm">Bill To</span>
          <div className="flex flex-col">
            <span className="text-base font-bold text-primary">
              {invoice.clientName}
            </span>
            <span className="text-base font-bold text-primary">
              {invoice.clientEmail}
            </span>
          </div>
        </div>
      </div>

      {/* Items Container */}
      <div className="w-full mt-8 rounded-md overflow-hidden bg-white dark:bg-[#1b1d23]">
        <InvoiceInfoItemList items={invoice.items} />

        <div className="p-6 bg-[#373B53] dark:bg-[#0C0E16] flex justify-between items-center text-white">
          <span>Amount Due</span>
          <span className="text-2xl font-bold">
            ${formatNumber(invoice.total)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default InvoiceInfo;
