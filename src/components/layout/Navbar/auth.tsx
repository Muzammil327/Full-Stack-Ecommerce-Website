import React from "react";
import Link from "next/link";
import styles from "@/src/components/layout/Navbar/navbar.module.scss";
import { useAuth } from "@/src/components/context/authContext";
import { signOut } from "next-auth/react";

export default function Auth() {
  const { session, status } = useAuth();

  return (
    <>
      {status === "loading" ? (
        <div className="hidden lg:flex border bg-slate-300 shadow rounded-md p-2">
          <div className="animate-pulse flex flex-row items-center gap-4">
            <div className="h-5 w-12 mx-1"></div>
            <div className="h-5 w-12 mx-1"></div>
          </div>
        </div>
      ) : status === "authenticated" ? (
        <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
          {session ? (
            <>
              {session.user.role === "user" && (
                <Link href="/profile" className={styles.link}>
                  Profile
                  <span className="sr-only">User Profile</span>
                </Link>
              )}
              {session.user.role === "admin" && (
                <Link href="/admin" className={styles.link}>
                  Admin
                  <span className="sr-only">Admin Profile</span>
                </Link>
              )}
              <button
                onClick={() => signOut({ callbackUrl: "/" })}
                className={styles.link}
              >
                <span className="sr-only">Admin and User Sign Out</span>
                Sign Out
              </button>
            </>
          ) : null}
        </div>
      ) : (
        <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
          <Link href="/sign-in" className={styles.link}>
            <span className="sr-only">Sign in</span>
            Sign in
          </Link>
          <Link href="/create-account" className={styles.link}>
            <span className="sr-only">Create account</span>
            Create account
          </Link>
        </div>
      )}
    </>
  );
}
