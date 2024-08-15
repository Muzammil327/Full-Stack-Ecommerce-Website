import React from "react";
import AdminAddCatgeoryView from "@/src/components/dashboard/AdminDashboard/catgeory/add/page";
import { getSession } from "@/src/utils/getSession";
import { redirect } from "next/navigation";

export default async function page() {
  const session = await getSession();
  if (!session) redirect("/sign-in");
  return <AdminAddCatgeoryView />;
}
