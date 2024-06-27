import React from "react";
import { getSession } from "@/src/utils/getSession";
import { redirect } from "next/navigation";
import WishlistView from "@/src/components/wishlist/page";

export default async function page() {
  const session = await getSession();
  if (!session) redirect("/sign-in");
  return (
    <main>
      <WishlistView />
    </main>
  );
}
