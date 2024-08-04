import { useMutation, useQueryClient } from "@tanstack/react-query";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";

import { SafeInvoice } from "@/types";

type ResponseType = SafeInvoice;
type RequestType = FieldValues;

export const useEditInvoice = (id?: string) => {
  const queryClient = useQueryClient();

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (json) => {
      const response = await fetch(`/api/invoices/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(json),
      });

      return await response.json();
    },
    onSuccess: () => {
      toast.success("Invoice updated.");
      queryClient.invalidateQueries({ queryKey: ["invoice", { id }] });
      queryClient.invalidateQueries({ queryKey: ["invoices"] });
    },
    onError: () => {
      toast.error("Failed to edit invoice.");
    },
  });

  return mutation;
};
