import React from "react";
import AdminProductAddPage from "@/src/components/admin/products/AdminProductView/AdminProductAddPage/page";
import { getSession } from "@/src/utils/getSession";
import { redirect } from "next/navigation";

export default async function page() {
  const session = await getSession();
  if (!session) redirect("/sign-in");
  return <AdminProductAddPage />;
}
