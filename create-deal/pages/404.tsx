import Link from "next/link";
import React from "react";

export default function Custom404() {
  return (
    <div
      className="flex flex-col items-center justify-center p-16"
      role="alert"
    >
      <h1
        className="text-6xl font-bold text-red-600"
        aria-label="Page Not Found (404)"
      >
        404
      </h1>
      <h2 className="mt-4 text-2xl text-gray-800">Page Not Found</h2>
      <p className="mt-2 text-gray-600">
        Sorry, the page you are looking for does not exist.
      </p>
      <Link href="/">
        <a
          className="mt-6 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          aria-label="Go Back Home"
        >
          Go Back Home
        </a>
      </Link>
    </div>
  );
}
