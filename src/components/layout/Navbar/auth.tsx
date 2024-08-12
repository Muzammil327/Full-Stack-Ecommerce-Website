import React from "react";
import Link from "next/link";
import { signOut } from "next-auth/react";

export default function Auth({ userId }: any) {
  return (
    <div className="lg:flex lg:flex-1 lg:items-center lg:justify-end md:space-x-6 md:block hidden">
      {userId ? (
        <>
          <Link
            href="/dashboard"
            className="text-sm font-medium text-gray-700 hover:text-gray-800"
          >
            Dashboard
            <span className="sr-only">Admin Profile</span>
          </Link>
          <button
            onClick={() => signOut({ callbackUrl: "https://smishopmart.vercel.app/" })}
            className="text-sm font-medium text-gray-700 hover:text-gray-800"
          >
            <span className="sr-only">Admin and User Sign Out</span>
            Sign Out
          </button>
        </>
      ) : (
        <>
          <Link
            href="/sign-in"
            className="text-sm font-medium text-gray-700 hover:text-gray-800"
          >
            <span className="sr-only">Sign in</span>
            Sign in
          </Link>
          <Link
            href="/create-account"
            className="text-sm font-medium text-gray-700 hover:text-gray-800"
          >
            <span className="sr-only">Create account</span>
            Create account
          </Link>
        </>
      )}
    </div>
  );
}
