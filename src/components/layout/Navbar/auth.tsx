import React from "react";
import Link from "next/link";
import styles from "./navbar.module.scss";
import { useAuth } from "../../context/authContext";
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
                </Link>
              )}
              {session.user.role === "admin" && (
                <Link href="/admin" className={styles.link}>
                  Admin
                </Link>
              )}
              <button
                onClick={() => signOut({ callbackUrl: "/" })}
                className={styles.link}
              >
                Sign Out
              </button>
            </>
          ) : null}
        </div>
      ) : (
        <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
          <Link href="/sign-in" className={styles.link}>
            Sign in
          </Link>
          <Link href="/create-account" className={styles.link}>
            Create account
          </Link>
        </div>
      )}
    </>
  );
}
