import React from "react";
import { getSession } from "@/src/utils/getSession";
import { redirect } from "next/navigation";
import SignView from "@/src/components/auth/sign-in/page";

export default async function page() {
  const session = await getSession();
  if (session) redirect("/dashboard");
  return (
    <main>
      <SignView />
    </main>
  );
}
