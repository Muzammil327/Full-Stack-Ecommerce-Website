import React from "react";
import AdminSizeAddView from "@/src/components/dashboard/AdminDashboard/size/add/page";
import { getSession } from "@/src/utils/getSession";
import { redirect } from "next/navigation";

export default async function page() {
  const session = await getSession();
  if (!session) redirect("/sign-in");
  return <AdminSizeAddView />;
}
