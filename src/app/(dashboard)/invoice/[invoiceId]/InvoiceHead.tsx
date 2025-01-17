"use client";

interface InvoiceHeadProps {
  children: React.ReactNode;
}

const InvoiceHead: React.FC<InvoiceHeadProps> = ({ children }) => {
  return (
    <div className="flex justify-between px-8 py-5 bg-[#FFFFFF] rounded-md">
      <div className="flex items-center justify-between flex-1 gap-4 sm:justify-normal">
        <span className="text-[#858BB2]">Status</span>
      </div>
      <div className="hidden gap-2 sm:flex">{children}</div>
    </div>
  );
};

export default InvoiceHead;
