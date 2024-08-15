import React from "react";
import AdminSubCatgeoryView from "@/src/components/dashboard/AdminDashboard/subcatgeory/page";
import { getSession } from "@/src/utils/getSession";
import { redirect } from "next/navigation";

export default async function page() {
  const session = await getSession();
  if (!session) redirect("/sign-in");
  return <AdminSubCatgeoryView />;
}
