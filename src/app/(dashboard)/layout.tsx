import DashboardSidebar from "./components/Sidebar";
import './style.scss'
export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <DashboardSidebar />
      {children}
    </>
  );
}
