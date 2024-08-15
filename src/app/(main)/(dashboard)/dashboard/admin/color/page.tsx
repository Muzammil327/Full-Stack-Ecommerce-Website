import React from "react";
import AdminColorView from "@/src/components/dashboard/AdminDashboard/color/page";
import { getSession } from "@/src/utils/getSession";
import { redirect } from "next/navigation";

export default async function page() {
  const session = await getSession();
  if (!session) redirect("/sign-in");
  return <AdminColorView />;
}
