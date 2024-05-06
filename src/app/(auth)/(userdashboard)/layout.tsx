import UserSidebar from "./UserSidebar/page";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <div className="grid grid-cols-1">
        <div className="">
          <UserSidebar />
        </div>
        <div className=" px-4 py-5">{children}</div>
      </div>
    </>
  );
}
