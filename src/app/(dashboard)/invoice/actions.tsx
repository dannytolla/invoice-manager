"use client";

import { Download, Edit, Info, MoreHorizontal, Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useDeleteInvoice } from "@/features/invoices/api/use-delete-invoice";
import { useOpenInvoice } from "@/features/invoices/hooks/use-open-invoice";
import { useCreatePDF } from "@/features/invoices/api/use-report-generate-invoice";
import { useConfirm } from "@/hooks/use-confirm";

type ActionsProps = {
  id: string;
};

export const Actions = ({ id }: ActionsProps) => {
  const deleteMutation = useDeleteInvoice(id);
  const { onOpen } = useOpenInvoice();
  const pdfExportMutation = useCreatePDF();

  const router = useRouter();

  const [ConfirmDialog, confirm] = useConfirm(
    "Are you sure?",
    "You are about to delete this invoice."
  );

  const handleDelete = async () => {
    const ok = await confirm();

    if (ok) {
      deleteMutation.mutate();
    }
  };

  const handleShowDetail = () => {
    router.push(`/invoice/${id}`);
  };

  const handlePDFExport = async () => {
    await pdfExportMutation.mutateAsync(id);

    // const response = await fetch(`/api/invoices/${id}/pdf`);
    // if (!response.ok) throw new Error("Failed to generate PDF");
    // const blob = await response.blob();
    // const url = window.URL.createObjectURL(blob);
    // const a = document.createElement("a");
    // a.href = url;
    // a.download = `invoice-${id}.pdf`;
    // a.click();
  };

  return (
    <>
      <ConfirmDialog />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="size-8 p-0">
            <MoreHorizontal className="size-4" />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end">
          <DropdownMenuItem
            disabled={deleteMutation.isPending}
            onClick={() => onOpen(id)}
          >
            <Edit className="mr-2 size-4" />
            Edit
          </DropdownMenuItem>

          <DropdownMenuItem onClick={handleShowDetail}>
            <Info className="mr-2 size-4" />
            Show Detail
          </DropdownMenuItem>

          <DropdownMenuItem onClick={handlePDFExport}>
            <Download className="mr-2 size-4" />
            PDF Export
          </DropdownMenuItem>

          <DropdownMenuItem
            disabled={deleteMutation.isPending}
            onClick={handleDelete}
          >
            <Trash className="mr-2 size-4" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
