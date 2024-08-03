"use client";

import { useMountedState } from "react-use";

import { EditInvoiceSheet } from "@/features/invoices/components/edit-invoice-sheet";
import { NewInvoiceSheet } from "@/features/invoices/components/new-invoice-sheet";

export const SheetProvider = () => {
  const isMounted = useMountedState(); // determine whether the component is currently mounted or not

  if (!isMounted) return null;

  return (
    <>
      <EditInvoiceSheet />
      <NewInvoiceSheet />
    </>
  );
};
