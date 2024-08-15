import React from "react";
import AdminProductView from "@/src/components/dashboard/AdminDashboard/products/page";
import { getSession } from "@/src/utils/getSession";
import { redirect } from "next/navigation";

export default async function page() {
  const session = await getSession();
  if (!session) redirect("/sign-in");
  return <AdminProductView />;
}
