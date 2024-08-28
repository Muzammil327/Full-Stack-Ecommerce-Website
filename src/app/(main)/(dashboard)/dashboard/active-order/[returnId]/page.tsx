import React from "react";
import { getSession } from "@/src/utils/getSession";
import { redirect } from "next/navigation";
import ReturnReplaceForm from "./form";

interface Iprops {
  params: {
    returnId: string;
  };
}

export default async function page({ params }: Iprops) {
  const session = await getSession();
  if (!session) redirect("/sign-in");
  return (
    <main>
      <ReturnReplaceForm orderId={params.returnId} />
    </main>
  );
}
