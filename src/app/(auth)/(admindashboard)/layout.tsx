import AdminSidebar from "./AdminSidebar/page";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <div className="grid md:grid-cols-9">
        <div className="md:col-span-2">
          <AdminSidebar />
          <h1>fd</h1>
        </div>
        <div className="md:col-span-7 px-4 py-5">{children}
        </div>
      </div>
    </>
  );
}
