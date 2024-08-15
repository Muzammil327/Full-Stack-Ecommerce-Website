import React from "react";
import AdminProductAddView from "@/src/components/dashboard/AdminDashboard/products/add/page";
import { getSession } from "@/src/utils/getSession";
import { redirect } from "next/navigation";

export default async function page() {
  const session = await getSession();
  if (!session) redirect("/sign-in");
  return <AdminProductAddView />;
}
