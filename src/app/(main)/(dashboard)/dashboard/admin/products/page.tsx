import AdminProductView from "@/src/components/admin/products/page";
import { getSession } from "@/src/utils/getSession";
import { redirect } from "next/navigation";
import React from "react";

export default async function page() {
  const session = await getSession();
  if (!session) redirect("/sign-in");
  return (
    <>
      <AdminProductView />
    </>
  );
}
