import React from "react";
import { getSession } from "@/src/utils/getSession";
import { redirect } from "next/navigation";
import ReturnReplaceMessage from "./message";

export default async function page() {
  const session = await getSession();
  if (!session) redirect("/sign-in");
  return (
    <main>
      <ReturnReplaceMessage />
    </main>
  );
}
