import React from "react";
import AdminAddSubCatgeoryView from "@/src/components/dashboard/AdminDashboard/subcatgeory/add/page";
import { getSession } from "@/src/utils/getSession";
import { redirect } from "next/navigation";

export default async function page() {
  const session = await getSession();
  if (!session) redirect("/sign-in");
  return <AdminAddSubCatgeoryView />;
}
