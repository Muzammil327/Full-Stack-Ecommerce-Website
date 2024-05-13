import React from "react";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { useAuth } from "../../contexts/authContext";

export default function Auth() {
  const { session, status } = useAuth();

  return (
    <div className="lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6 md:block hidden">
      {status === "loading" && (
        <div className="hidden lg:flex border bg-slate-300 shadow rounded-md p-2">
          <div className="animate-pulse flex flex-row items-center gap-4">
            <div className="h-5 w-12 mx-1"></div>
            <div className="h-5 w-12 mx-1"></div>
          </div>
        </div>
      )}

      {status === "authenticated" && (
        <>
          {session && (
            <>
              {session.user.role === "user" && (
                <Link
                  href="/profile"
                  className="text-sm font-medium text-gray-700 hover:text-gray-800"
                >
                  Profile
                  <span className="sr-only">User Profile</span>
                </Link>
              )}
              {session.user.role === "admin" && (
                <Link
                  href="/admin"
                  className="text-sm font-medium text-gray-700 hover:text-gray-800"
                >
                  Admin
                  <span className="sr-only">Admin Profile</span>
                </Link>
              )}
              <button
                onClick={() => signOut({ callbackUrl: "/" })}
                className="text-sm font-medium text-gray-700 hover:text-gray-800"
              >
                <span className="sr-only">Admin and User Sign Out</span>
                Sign Out
              </button>
            </>
          )}
        </>
      )}

      {status === "unauthenticated" && (
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
