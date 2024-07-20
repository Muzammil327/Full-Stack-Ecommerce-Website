import AccessDenied from "@/src/components/dashboard/AccessDenied/page";
import AdminDashboard from "@/src/components/dashboard/AdminDashboard/page";
import UserDashboard from "@/src/components/dashboard/UserDashboard/page";
import { getSession } from "@/src/utils/getSession";
import { redirect } from "next/navigation";

export default async function Page() {
  const session = await getSession();
  if (!session) redirect("/sign-in");
  
  const userRole = session?.user?.role;
  const userId = session?.user?._id;

  if (userRole === 'admin') {
    return <AdminDashboard userId={userId} />; // Component for admin users
  } else if (userRole === 'user') {
    return <UserDashboard userId={userId} />; // Component for regular users
  } else {
    return <AccessDenied />; // Component shown for unauthorized access
  }
}
