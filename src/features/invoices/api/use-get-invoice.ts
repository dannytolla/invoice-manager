import { validateRequest } from "@/auth";
import prisma from "@/lib/prisma";
import { useQuery } from "@tanstack/react-query";

export const useGetInvoice = (id?: string) => {
  const query = useQuery({
    queryKey: ["invoice", { id }],
    enabled: !!id,
    queryFn: async () => {
      const response = await fetch(`/api/invoices/${id}`);

      if (!response.ok) throw new Error("Failed to fetch invoice.");

      const { data } = await response.json();

      return data;
    },
  });

  return query;
};
