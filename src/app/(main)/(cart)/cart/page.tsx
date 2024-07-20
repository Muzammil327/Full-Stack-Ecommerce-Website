import React from "react";
import { getSession } from "@/src/utils/getSession";
import { redirect } from "next/navigation";
import CartView from "@/src/components/cart/page";

export default async function page() {
  const session = await getSession();
  if (!session) redirect("/sign-in");
  return (
    <main>
      <CartView userId={session?.user?._id} />
    </main>
  );
}
