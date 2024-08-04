import { Loader2 } from "lucide-react";
import { z } from "zod";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

import { useDeleteInvoice } from "@/features/invoices/api/use-delete-invoice";
import { useEditInvoice } from "@/features/invoices/api/use-edit-invoice";
import { useGetInvoice } from "@/features/invoices/api/use-get-invoice";
import { useOpenInvoice } from "@/features/invoices/hooks/use-open-invoice";
import { useConfirm } from "@/hooks/use-confirm";

import { InvoiceForm } from "./invoice-form";
import { FieldValues } from "react-hook-form";

export const EditInvoiceSheet = () => {
  const { isOpen, onClose, id } = useOpenInvoice();

  const [ConfirmDialog, confirm] = useConfirm(
    "Are you sure?",
    "You are about to delete this invoice."
  );

  const invoiceQuery = useGetInvoice(id);
  const editMutation = useEditInvoice(id);
  const deleteMutation = useDeleteInvoice(id);

  const isPending =
    editMutation.isPending ||
    deleteMutation.isPending ||
    invoiceQuery.isLoading;

  const isLoading = invoiceQuery.isLoading;

  const onSubmit = (values: FieldValues) => {
    editMutation.mutate(values, {
      onSuccess: () => {
        onClose();
      },
    });
  };

  const defaultValues = invoiceQuery.data
    ? {
        dueDate: invoiceQuery.data.dueDate
          ? new Date(invoiceQuery.data.dueDate)
          : new Date(),
        invoiceNumber: invoiceQuery.data.invoiceNumber,
        description: invoiceQuery.data.description,
        clientName: invoiceQuery.data.clientName,
        clientEmail: invoiceQuery.data.clientEmail,
        city: invoiceQuery.data.city,
        Items: invoiceQuery.data.items,
      }
    : {
        dueDate: new Date(),
        invoiceNumber: "",
        description: "",
        clientName: "",
        clientEmail: "",
        city: "",
        Items: [{ name: "", quantity: "", price: "" }],
      };

  const onDelete = async () => {
    const ok = await confirm();

    if (ok) {
      deleteMutation.mutate(undefined, {
        onSuccess: () => {
          onClose();
        },
      });
    }
  };

  return (
    <>
      <ConfirmDialog />
      <Sheet open={isOpen || isPending} onOpenChange={onClose}>
        <SheetContent className="space-y-4">
          <SheetHeader>
            <SheetTitle>Edit Invoice</SheetTitle>

            <SheetDescription>Edit an existing invoice.</SheetDescription>
          </SheetHeader>

          {isLoading ? (
            <div className="absolute inset-0 flex items-center justify-center">
              <Loader2 className="size-4 animate-spin text-muted-foreground" />
            </div>
          ) : (
            <InvoiceForm
              id={id}
              defaultValues={defaultValues}
              onSubmit={onSubmit}
              disabled={isPending}
              onDelete={onDelete}
            />
          )}
        </SheetContent>
      </Sheet>
    </>
  );
};
