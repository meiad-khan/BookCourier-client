import React from "react";
import { Link } from "react-router";

const ErrorPage = () => {
  return (
    <div
      className="min-h-screen flex flex-col justify-center items-center 
                    bg-gray-100 dark:bg-gray-900 px-4"
    >
      <h1 className="text-7xl font-bold text-indigo-600 dark:text-indigo-400 mb-4">
        404
      </h1>

      <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-2">
        Page Not Found
      </h2>

      <p className="text-gray-600 dark:text-gray-400 text-center mb-6 max-w-md">
        Sorry, the page you are looking for doesn’t exist or has been moved.
      </p>

      <Link
        to="/"
        className="px-6 py-3 rounded-lg bg-indigo-600 text-white 
                   hover:bg-indigo-700 transition duration-300"
      >
        Go Back Home
      </Link>
    </div>
  );
};

export default ErrorPage;
