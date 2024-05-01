import React from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { redirect } from "next/navigation";
import styles from "./navbar.module.scss";

export default function Auth() {
  const { data: session, status, update } = useSession();
  const handleLogout = async () => {
    await signOut();
    redirect("/");
  };
  return (
    <>
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
            <button onClick={handleLogout} className={styles.link}>
              Log Out
            </button>
          </>
        ) : (
          <>
            <Link href="/sign-in" className={styles.link}>
              Sign in
            </Link>
            <Link href="/create-account" className={styles.link}>
              Create account
            </Link>
          </>
        )}
      </div>
    </>
  );
}
