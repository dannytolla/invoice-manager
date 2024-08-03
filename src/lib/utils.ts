import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { format, subDays } from "date-fns";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(value: number) {
  return Intl.NumberFormat("en-us", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format(value);
}

type Period = {
  from: string | Date | undefined;
  to: string | Date | undefined;
};

export function formatDateRange(period?: Period) {
  const defaultTo = new Date();
  const defaultFrom = subDays(defaultTo, 30);

  if (!period?.from) {
    return `${format(defaultFrom, "LLL dd")} - ${format(
      defaultTo,
      "LLL dd, y"
    )}`;
  }

  if (period?.to) {
    return `${format(period.from, "LLL dd")} - ${format(
      period.to,
      "LLL dd, y"
    )}`;
  }

  return format(period.from, "LLL dd, y");
}

export function slugify(input: string): string {
  return input
    .toLowerCase()
    .replace(/ /g, "-")
    .replace(/[^a-z0-9-]/g, "");
}

export function formatNumber(value: number) {
  return Intl.NumberFormat().format(value);
}
