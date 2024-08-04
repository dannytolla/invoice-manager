"use client";

import { Download, Loader2, Plus } from "lucide-react";

import { DataTable } from "@/components/data-table";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetInvoices } from "@/features/invoices/api/use-get-invoices";
import { useNewInvoice } from "@/features/invoices/hooks/use-new-invoice";
import { useCreateReport } from "@/features/invoices/api/use-report-generate-invoice";

import { columns } from "./invoice/columns";

const InvoicePage = () => {
  const newInvoice = useNewInvoice();
  const invoicesQuery = useGetInvoices();
  const reportMutation = useCreateReport();

  const invoices = invoicesQuery.data || [];

  const handleExcelExport = async () => {
    await reportMutation.mutateAsync();
  };

  if (invoicesQuery.isLoading) {
    return (
      <div className="mx-auto -mt-6 w-full max-w-screen-2xl pb-10">
        <Card className="border-none drop-shadow-sm">
          <CardHeader>
            <Skeleton className="h-8 w-48" />
          </CardHeader>

          <CardContent>
            <div className="flex h-[500px] w-full items-center justify-center">
              <Loader2 className="size-6 animate-spin text-slate-300" />
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="mx-auto -mt-6 w-full max-w-screen-2xl pb-10">
      <Card className="border-none drop-shadow-sm">
        <CardHeader className="gap-y-2 lg:flex-row lg:items-center lg:justify-between">
          <CardTitle className="line-clamp-1 text-xl">
            Invoice History
          </CardTitle>

          <div className="flex flex-col items-center gap-x-2 gap-y-2 lg:flex-row">
            <Button
              size="sm"
              onClick={newInvoice.onOpen}
              className="w-full lg:w-auto"
            >
              <Plus className="mr-2 size-4" /> Add new
            </Button>

            <Button
              size="sm"
              onClick={handleExcelExport}
              className="w-full lg:w-auto"
            >
              <Download className="mr-2 size-4" />
              {reportMutation.isPending ? "Exporting..." : "Export Excel"}
            </Button>
          </div>
        </CardHeader>

        <CardContent>
          <DataTable filterKey="clientName" columns={columns} data={invoices} />
        </CardContent>
      </Card>
    </div>
  );
};

export default InvoicePage;
