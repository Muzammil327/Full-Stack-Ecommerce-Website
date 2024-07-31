import React from "react";
import AdminItemCatgeoryAdd from "@/src/components/admin/products/AdminCatgeoryView/AdminItemCatgeoryAdd/page";
import { getSession } from "@/src/utils/getSession";
import { redirect } from "next/navigation";

export default async function page() {
  const session = await getSession();
  if (!session) redirect("/sign-in");
  return <AdminItemCatgeoryAdd />;
}
