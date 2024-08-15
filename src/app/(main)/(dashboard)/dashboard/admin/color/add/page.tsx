import React from "react";
import AdminColorAddView from "@/src/components/dashboard/AdminDashboard/color/add/page";
import { getSession } from "@/src/utils/getSession";
import { redirect } from "next/navigation";

export default async function page() {
  const session = await getSession();
  if (!session) redirect("/sign-in");
  return <AdminColorAddView />;
}
