// components/ClientSignOut.js
"use client"; // Ensure this is a client-side component

import { useEffect } from "react";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

const ClientSignOut = () => {
  const router = useRouter();

  useEffect(() => {
    (async () => {
      await signOut({ redirect: false });
    })();
  }, [router]);

  return null;
};

export default ClientSignOut;
