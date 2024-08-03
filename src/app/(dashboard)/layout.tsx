import type { PropsWithChildren } from "react";
import { validateRequest } from "@/auth";
import { redirect } from "next/navigation";

import { Header } from "@/components/header";
import SessionProvider from "./SessionProvider";

const DashboardLayout = async ({ children }: PropsWithChildren) => {
  const session = await validateRequest();

  if (!session.user) redirect("/login");

  return (
    <SessionProvider value={session}>
      <Header />
      <main className="px-3 lg:px-14">{children}</main>
    </SessionProvider>
  );
};

export default DashboardLayout;
