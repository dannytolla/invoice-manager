import type { Viewport } from "next";
import { Inter } from "next/font/google";
import type { PropsWithChildren } from "react";

import { Toaster } from "@/components/ui/sonner";
import { QueryProviders } from "@/providers/query-provider";
import { SheetProvider } from "@/providers/sheet-provider";

import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const viewport: Viewport = {
  themeColor: "#3d82f6",
};

const RootLayout = ({ children }: Readonly<PropsWithChildren>) => {
  return (
    <html lang="en">
      <body className={inter.className}>
        <QueryProviders>
          <SheetProvider />
          <Toaster richColors theme="light" />

          {children}
        </QueryProviders>
      </body>
    </html>
  );
};

export default RootLayout;
