import React from "react";
import { getSession } from "@/src/utils/getSession";
import { redirect } from "next/navigation";
import RegisterAccountView from "@/src/components/auth/register/page";

export default async function page() {
  const session = await getSession();
  if (session) redirect("/dashboard");
  return (
    <main>
      <RegisterAccountView />
    </main>
  );
}
