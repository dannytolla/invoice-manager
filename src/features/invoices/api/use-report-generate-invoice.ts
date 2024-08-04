import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useCreateReport = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async () => {
      const response = await fetch("/api/invoices/balance-sheet");

      if (!response.ok) {
        throw new Error("Failed to generate Excel file");
      }

      console.log({ response });

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `balance-sheet-${new Date().toISOString()}.xlsx`;
      a.click();

      return blob;
    },
    onSuccess: () => {
      toast.success("Excel file generated and downloaded.");
      queryClient.invalidateQueries({ queryKey: ["invoices"] });
    },
    onError: (error) => {
      toast.error(`Failed to generate Excel file: ${error.message}`);
    },
  });

  return mutation;
};

export const useCreatePDF = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (id: string) => {
      const response = await fetch(`/api/invoices/${id}/pdf`);
      if (!response.ok) throw new Error("Failed to generate PDF");
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `invoice-${id}.pdf`;
      a.click();
    },
    onSuccess: () => {
      toast.success("PDF file generated and downloaded.");
      queryClient.invalidateQueries({ queryKey: ["invoices"] });
    },
    onError: (error) => {
      toast.error(`Failed to generate PDF file: ${error.message}`);
    },
  });

  return mutation;
};
