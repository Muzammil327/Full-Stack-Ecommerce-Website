import React from "react";
import { getSession } from "@/src/utils/getSession";
import NavbarView from "./Navbar";

export default async function page() {
  const session = await getSession();
  const userId = session?.user?._id as string;

  return <NavbarView userId={userId} />;
}
