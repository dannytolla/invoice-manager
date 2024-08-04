// import getInvoiceById from "@/app/actions/getInvoiceById";

import EmptyState from "@/components/EmptyState";
import { getInvoiceById } from "@/features/invoices/api/get-invoice";
import InvoiceClient from "./InvoiceClient";
// import InvoiceClient from "./InvoiceClient";

interface IParams {
  invoiceId?: string;
}

const InvoiceDetail = async ({ params }: { params: IParams }) => {
  const invoice = await getInvoiceById(params);

  if (!invoice) {
    return (
      <EmptyState title="404" subtitle="The page doesn't exist" showReset />
    );
  }

  return <InvoiceClient invoice={invoice} />;
};

export default InvoiceDetail;
