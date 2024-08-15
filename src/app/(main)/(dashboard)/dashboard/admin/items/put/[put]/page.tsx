import React from "react";
import AdminItemsEditView from "@/src/components/dashboard/AdminDashboard/item/edit/page";
import { getSession } from "@/src/utils/getSession";
import { redirect } from "next/navigation";

export default async function page() {
  const session = await getSession();
  if (!session) redirect("/sign-in");
  return <AdminItemsEditView />;
}
