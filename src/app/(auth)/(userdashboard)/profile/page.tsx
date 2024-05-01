"use client";

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

export default function ClientComponent() {
  const { data: session, status } = useSession();
  if (session?.user.role === "admin") {
    return redirect("/admin");
  }
  console.log(session)
  return (
    <>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <caption className="p-5 text-lg font-semibold rtl:text-right text-gray-900 bg-white dark:text-white dark:bg-gray-800 text-center">
            User Profile
          </caption>
          <tbody>
            <tr className="bg-white border-b">
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
              >
                User Name
              </th>
              <td className="px-6 py-4">
                {status === "authenticated" && session.user?.username}
              </td>
            </tr>
            <tr className="bg-white border-b">
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
              >
                Email
              </th>
              <td className="px-6 py-4">
                {status === "authenticated" && session.user?.email}
              </td>
            </tr>
            <tr className="bg-white border-b">
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
              >
                Phone Number
              </th>
              <td className="px-6 py-4">
                {" "}
                {status === "authenticated" && session.user?.phone}
              </td>
            </tr>
            <tr className="bg-white border-b">
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
              >
                Address
              </th>
              <td className="px-6 py-4">gfhgf</td>
            </tr>
            <tr className="bg-white border-b">
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
              >
                Country
              </th>
              <td className="px-6 py-4">Pakistan</td>
            </tr>
            <tr className="bg-white border-b">
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
              >
                City
              </th>
              <td className="px-6 py-4">gfhgf</td>
            </tr>
            <tr className="bg-white border-b">
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
              >
                Postal/Zip Code
              </th>
              <td className="px-6 py-4">gfhgf</td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}
