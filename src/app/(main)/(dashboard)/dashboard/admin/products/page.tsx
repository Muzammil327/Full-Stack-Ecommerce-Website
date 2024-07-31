import React from "react";
import AdminProductView from "@/src/components/admin/products/AdminProductView/page";
import { getSession } from "@/src/utils/getSession";
import { redirect } from "next/navigation";

export default async function page() {
  const session = await getSession();
  if (!session) redirect("/sign-in");
  return <AdminProductView />;
}
