import React from "react";
import AdminColorEditView from "@/src/components/dashboard/AdminDashboard/color/edit/page";
import { getSession } from "@/src/utils/getSession";
import { redirect } from "next/navigation";

export default async function page() {
  const session = await getSession();
  if (!session) redirect("/sign-in");
  return <AdminColorEditView />;
}
