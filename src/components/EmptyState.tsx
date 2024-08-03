"use client";

import Image from "next/image";

// import image from "../../public/images/illustration-empty.svg";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";

interface EmptyStateProps {
  title?: string;
  subtitle?: string;
  showReset?: boolean;
}

const EmptyState: React.FC<EmptyStateProps> = ({
  title,
  subtitle,
  showReset,
}) => {
  const router = useRouter();
  return (
    <div className="self-center flex-1 w-full overflow-y-auto">
      <div className="flex flex-col items-center justify-center">
        <div className="mb-16 mt-6 w-[220px] sm:w-[240px]">
          {/* <Image src={image} priority alt="Illustration" /> */}
        </div>
        <h2 className="text-4xl md:text-9xl font-extrabold text-gray-800 mb-4">
          {title}
        </h2>
        <p className="text-2xl md:text-4xl font-bold text-gray-600 mb-8">
          {subtitle}
        </p>
        {showReset && (
          <Button color="purple" onClick={() => router.push("/")}>
            Go to Home Page
          </Button>
        )}
      </div>
    </div>
  );
};

export default EmptyState;
