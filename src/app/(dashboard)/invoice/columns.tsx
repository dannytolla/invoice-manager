"use client";

import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { ArrowUpDown } from "lucide-react";

import { Button } from "@/components/ui/button";

import { Actions } from "./actions";
import { Item } from "@prisma/client";

export type ResponseType = {
  id: string;
  date: Date;
  invoiceNumber: string;
  dueDate: Date;
  clientName: string;
  clientEmail: string;
  items: Item[];
  createdAt: Date;
};

export const columns: ColumnDef<ResponseType>[] = [
  {
    accessorKey: "index",
    header: "#",
    cell: ({ row }) => <span>{row.index + 1}</span>,
  },
  {
    accessorKey: "invoiceNumber",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Invoice Num.
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const invoiceNumber = row.getValue("invoiceNumber") as string;

      return <span className="ml-5">#{invoiceNumber}</span>;
    },
  },
  {
    accessorKey: "dueDate",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Due Date
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const date = row.getValue("dueDate") as Date;

      return <span>{format(date, "dd MMM, yyyy")}</span>;
    },
  },
  {
    accessorKey: "clientName",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Client Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "clientEmail",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Client Email
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  // {
  //   accessorKey: "items_length",
  //   header: ({ column }) => {
  //     return (
  //       <Button
  //         variant="ghost"
  //         onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
  //       >
  //         Total Items
  //         <ArrowUpDown className="ml-2 h-4 w-4" />
  //       </Button>
  //     );
  //   },
  //   cell: ({ row }) => {
  //     const items = row.getValue("items") as Item[];

  //     return <span className="ml-10">{items.length}</span>;
  //   },
  // },
  {
    accessorKey: "items",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Items Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const items = row.getValue("items") as Item[];

      return (
        <div>
          {items.map((item, index) => (
            <div key={index} className="flex gap-1">
              <span>{++index}.</span>
              <span>{item.name}</span>
            </div>
          ))}
        </div>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Created Date
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const date = row.getValue("createdAt") as Date;

      return <span>{format(date, "dd MMM, yyyy")}</span>;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <Actions id={row.original.id} />,
  },
];
