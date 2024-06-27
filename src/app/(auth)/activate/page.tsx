import React from "react";
import { getSession } from "@/src/utils/getSession";
import { redirect } from "next/navigation";
import VerifyEmailView from "@/src/components/auth/activate/verifyEmail";

export default async function page() {
  const session = await getSession();
  if (session) redirect("/dashboard");
  return (
    <main>
      <VerifyEmailView />
    </main>
  );
}
