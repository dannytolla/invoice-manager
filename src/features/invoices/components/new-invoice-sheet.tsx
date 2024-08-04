import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { FieldValues } from "react-hook-form";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

import { useCreateInvoice } from "@/features/invoices/api/use-create-invoice";
import { useNewInvoice } from "@/features/invoices/hooks/use-new-invoice";

import { InvoiceForm } from "./invoice-form";

export const NewInvoiceSheet = () => {
  const { isOpen, onClose } = useNewInvoice();

  const createMutation = useCreateInvoice();

  const isPending = createMutation.isPending;
  const isLoading = false;

  const onSubmit = (values: FieldValues) => {
    if (values.Items?.length === 0) {
      toast.error("Please add at least one item.");
      return;
    }
    createMutation.mutate(values, {
      onSuccess: () => {
        onClose();
      },
    });
  };

  return (
    <Sheet open={isOpen || isPending} onOpenChange={onClose}>
      <SheetContent className="space-y-4">
        <SheetHeader>
          <SheetTitle>New Invoice</SheetTitle>

          <SheetDescription>Add a new invoice.</SheetDescription>
        </SheetHeader>

        {isLoading ? (
          <div className="absolute inset-0 flex items-center justify-center">
            <Loader2 className="size-4 animate-spin text-muted-foreground" />
          </div>
        ) : (
          <InvoiceForm onSubmit={onSubmit} disabled={isPending} />
        )}
      </SheetContent>
    </Sheet>
  );
};
