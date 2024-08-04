import { useQuery } from "@tanstack/react-query";

export const useGetInvoices = () => {
  const query = useQuery({
    queryKey: ["invoices"],
    queryFn: async () => {
      const response = await fetch("/api/invoices");

      if (!response.ok) throw new Error("Failed to fetch invoice.");

      const { data } = await response.json();

      return data;
    },
  });

  return query;
};
