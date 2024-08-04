"use client";

import { useSession } from "@/app/(dashboard)/SessionProvider";

export const WelcomeMsg = () => {
  const { user } = useSession();

  return (
    <div className="mb-4 space-y-2">
      <h2 className="text-xl font-medium text-white lg:text-4xl">
        Welcome back{user ? ", " : " "}
        {user?.name} 👋
      </h2>
      <p className="text-sm text-[#aec8f2] lg:text-base">
        This is your dashboard, here you can manage your invoices and clients.
      </p>
    </div>
  );
};
