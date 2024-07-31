import React from "react";
import AdminPlatformViewAdd from "@/src/components/admin/products/AdminPlatformView/AdminPlatformViewAdd/page";
import { getSession } from "@/src/utils/getSession";
import { redirect } from "next/navigation";

export default async function page() {
  const session = await getSession();
  if (!session) redirect("/sign-in");
  return <AdminPlatformViewAdd />;
}
