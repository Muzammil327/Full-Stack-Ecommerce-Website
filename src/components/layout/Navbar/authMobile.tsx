import React from "react";
import Link from "next/link";
import { signOut } from "next-auth/react";

export default function AuthMobile({ setOpen, userId }: any) {
  return (
    <>
      {userId ? (
        <>
          {" "}
          <div className="space-y-6 border-t border-gray-200 px-4 py-6">
            <div className="flow-root">
              <Link
                href="/dashboard"
                className="text-sm font-medium text-gray-700 hover:text-gray-800"
                onClick={() => setOpen(false)}
              >
                Dashboard
                <span className="sr-only">Dashboard Profile</span>
              </Link>{" "}
            </div>
            <div className="flow-root">
              <button
                onClick={() => {
                  signOut({ callbackUrl: "https://smishopmart.vercel.app/" });
                  setOpen(false);
                }}
                className="text-sm font-medium text-gray-700 hover:text-gray-800"
              >
                <span className="sr-only">Admin and User Sign Out</span>
                Sign Out
              </button>{" "}
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="space-y-6 border-t border-gray-200 px-4 py-6">
            <div className="flow-root">
              <Link
                href="/sign-in"
                className="text-sm font-medium text-gray-700 hover:text-gray-800"
                onClick={() => setOpen(false)}
              >
                <span className="sr-only">Sign in</span>
                Sign in
              </Link>{" "}
            </div>
            <div className="flow-root">
              <Link
                href="/create-account"
                className="text-sm font-medium text-gray-700 hover:text-gray-800"
                onClick={() => setOpen(false)}
              >
                <span className="sr-only">Create account</span>
                Create account
              </Link>{" "}
            </div>
          </div>
        </>
      )}
    </>
  );
}
