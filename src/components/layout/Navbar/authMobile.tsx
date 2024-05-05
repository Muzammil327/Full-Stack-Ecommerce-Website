import React from "react";
import Link from "next/link";
import styles from "@/src/components/layout/Navbar/navbar.module.scss";
import { useAuth } from "@/src/components/context/authContext";
import { signOut } from "next-auth/react";
import SubHeaderSocial from "../SubHeader/social";

export default function AuthMobile({ setOpen }: any) {
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
        <>
          {session ? (
            <>
              <div className="space-y-6 border-t border-gray-200 px-4 py-6">
                {session.user.role === "user" && (
                  <div className="flow-root">
                    <Link
                      href="/profile"
                      className={styles.link}
                      onClick={() => setOpen(false)}
                    >
                      Profile
                      <span className="sr-only">User Profile</span>
                    </Link>
                  </div>
                )}
                {session.user.role === "admin" && (
                  <div className="flow-root">
                    <Link
                      href="/admin"
                      className={styles.link}
                      onClick={() => setOpen(false)}
                    >
                      Admin
                      <span className="sr-only">Admin Profile</span>
                    </Link>{" "}
                  </div>
                )}

                <div className="flow-root">
                  <button
                    onClick={() => {
                      signOut({ callbackUrl: "/" });
                      setOpen(false);
                    }}
                    className={styles.link}
                  >
                    <span className="sr-only">Admin and User Sign Out</span>
                    Sign Out
                  </button>{" "}
                </div>
                <div className="space-y-6 border-t border-gray-200 py-6">
                  <SubHeaderSocial />{" "}
                </div>
              </div>
            </>
          ) : null}
        </>
      ) : (
        <>
          <div className="space-y-6 border-t border-gray-200 px-4 py-6">
            <div className="flow-root">
              <Link
                href="/sign-in"
                className={styles.link}
                onClick={() => setOpen(false)}
              >
                <span className="sr-only">Sign in</span>
                Sign in
              </Link>{" "}
            </div>
            <div className="flow-root">
              <Link
                href="/create-account"
                className={styles.link}
                onClick={() => setOpen(false)}
              >
                <span className="sr-only">Create account</span>
                Create account
              </Link>{" "}
            </div>
          </div>
          <div className="space-y-6 border-t border-gray-200 px-4 py-6">
            <SubHeaderSocial />
          </div>
        </>
      )}
    </>
  );
}
