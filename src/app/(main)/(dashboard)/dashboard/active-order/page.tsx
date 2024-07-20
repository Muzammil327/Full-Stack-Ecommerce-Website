import ActiveOrderView from "@/src/components/active-order/page";
import { getSession } from "@/src/utils/getSession";
import { redirect } from "next/navigation";

export default async function Page() {
  const session = await getSession();
  if (!session) redirect("/sign-in");

  return <ActiveOrderView />;
}
