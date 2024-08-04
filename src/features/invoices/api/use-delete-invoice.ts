import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { SafeInvoice } from "@/types";

type ResponseType = SafeInvoice;

export const useDeleteInvoice = (id?: string) => {
  const queryClient = useQueryClient();

  const mutation = useMutation<ResponseType, Error>({
    mutationFn: async () => {
      const response = await fetch(`/api/invoices/${id}`, {
        method: "DELETE",
      });
      return await response.json();
    },
    onSuccess: () => {
      toast.success("Invoice deleted.");
      queryClient.invalidateQueries({ queryKey: ["invoice", { id }] });
      queryClient.invalidateQueries({ queryKey: ["invoices"] });
    },
    onError: () => {
      toast.error("Failed to delete invoice.");
    },
  });

  return mutation;
};
