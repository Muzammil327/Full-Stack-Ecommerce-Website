import Sidebar from "./sidebar/page";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <div className="grid md:grid-cols-9">
        <div className="md:col-span-2">
          <Sidebar />
        </div>
        <div className="md:col-span-7 px-4 py-5">{children}</div>
      </div>
    </>
  );
}
