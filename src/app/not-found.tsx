import Link from "next/link";

function NotFoundPage() {
  return (
    <div className="flex flex-col justify-center items-center h-screen bg-gray-100">
      <h1 className="text-5xl md:text-9xl font-extrabold text-gray-800 mb-4">
        404
      </h1>
      <h2 className="text-3xl md:text-4xl font-bold text-gray-600 mb-8">
        Page Not Found
      </h2>
      <p className="text-sm mx-2 md:text-lg text-gray-500 mb-8">
        The page you are looking for might have been removed, had its name
        changed, or is temporarily unavailable.
      </p>
      <Link href="/">
        <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300 ease-in-out">
          Go to Home
        </button>
      </Link>
    </div>
  );
}

export default NotFoundPage;
