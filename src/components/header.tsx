import { WelcomeMsg } from "./welcome-msg";
import UserButton from "./user-button";
import Link from "next/link";

export const Header = () => {
  return (
    <header className="bg-gradient-to-b from-sky-900 to-sky-700 px-4 py-4 lg:px-14 lg:pb-10">
      <div className="mx-auto max-w-screen-2xl">
        <div className="mb-5 flex w-full items-center justify-between">
          <div className="flex items-center lg:gap-x-16">
            <Link href="/">
              <div className="hidden items-center lg:flex">
                <p className="text-lg font-semibold text-white font-sans tracking-wider">
                  Invoice Manager
                </p>
              </div>
            </Link>
          </div>

          <div className="flex items-center gap-x-2">
            <UserButton className="sm:ms-auto" />
          </div>
        </div>

        <WelcomeMsg />
      </div>
    </header>
  );
};
