import { useMutation, useQueryClient } from "@tanstack/react-query";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";

import { Invoice } from "@prisma/client";

type ResponseType = Invoice;
type RequestType = FieldValues;

export const useCreateInvoice = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (json) => {
      const response = await fetch("/api/invoices", {
        method: "POST",
        body: JSON.stringify(json),
      });

      if (!response.ok) {
        throw new Error("Failed to create invoice.");
      }

      const data = await response.json();

      return data;
    },
    onSuccess: () => {
      toast.success("Invoice created.");
      queryClient.invalidateQueries({ queryKey: ["invoices"] });
    },
    onError: () => {
      toast.error("Failed to create invoice.");
    },
  });

  return mutation;
};
