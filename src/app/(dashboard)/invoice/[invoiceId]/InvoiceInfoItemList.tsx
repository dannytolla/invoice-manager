import { formatNumber } from "@/lib/utils";
import { Item } from "@prisma/client";

interface InvoiceInfoItemListProps {
  items: Item[];
}

const InvoiceInfoItemList: React.FC<InvoiceInfoItemListProps> = ({ items }) => {
  return (
    <div className="p-4 sm:p-8 bg-[#F9FAFE] dark:bg-[#252945] overflow-x-auto">
      {/* Table head */}
      <div className="grid grid-cols-4 sm:grid-cols-9 mb-4">
        <span className="col-span-1 text-left">#</span>
        <span className="col-span-2 sm:col-span-3 text-left">Item Name</span>
        <span className="col-span-1 sm:hidden text-right">Total</span>
        <span className="hidden sm:block text-center sm:col-span-1">QTY.</span>
        <span className="hidden sm:block text-right sm:col-span-2">Price</span>
        <span className="hidden sm:block text-right sm:col-span-2">Total</span>
      </div>
      {/* Item list */}
      <ul className="flex flex-col gap-4 sm:gap-6">
        {items.map((item, index) => (
          <li
            key={index}
            className="grid grid-cols-4 sm:grid-cols-9 items-center font-bold text-primary"
          >
            <span className="col-span-1 text-left">{index + 1}</span>
            <div className="col-span-2 sm:col-span-3 flex flex-col gap-1">
              <span>{item.name}</span>
              <span className="text-sm text-[#7E88C3] dark:text-[#888EB0] sm:hidden">
                {item.quantity} x ${item.price}
              </span>
            </div>
            <span className="col-span-1 text-right sm:hidden">
              ${formatNumber(+item.quantity * +item.price)}
            </span>
            <span className="hidden sm:block text-center sm:col-span-1">
              {item.quantity}
            </span>
            <span className="hidden sm:block text-right sm:col-span-2">
              ${formatNumber(+item.price)}
            </span>
            <span className="hidden sm:block text-right sm:col-span-2">
              ${formatNumber(+item.quantity * +item.price)}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default InvoiceInfoItemList;
