import AdminProductPut from "@/src/components/admin/products/put/page";
import { getSession } from "@/src/utils/getSession";
import { redirect } from "next/navigation";
import React from "react";

export default async function page() {
  const session = await getSession();
  if (!session) redirect("/sign-in");
  return (
    <>
      <AdminProductPut />
    </>
  );
}
