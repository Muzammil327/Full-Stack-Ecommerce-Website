// "use client";

// import { useAuth } from "@/src/components/context/authContext";
// import { redirect } from "next/navigation";

// export default function Page() {
//   const { session, status } = useAuth();

//   if (status === "authenticated") {
//     if (session?.user.role === process.env.NEXT_PUBLIC_PRIVANCY_ROUTE) {
//       redirect("/admin");
//     } else if (session?.user.role === process.env.NEXT_PUBLIC_USER_ROUTE) {
//       redirect("/profile");
//     }
//   }
//   if (status === "unauthenticated") {
//     return redirect("/sign-in");
//   }
//   if (session === "null") {
//     return redirect("/sign-in");
//   }
//   return (
//     <>
//       {status === "authenticated" ? null : (
//         <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
//           <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
//             <caption className="p-5 text-lg font-semibold rtl:text-right text-gray-900 bg-white dark:text-white dark:bg-gray-800 text-center">
//               Admin Profile
//             </caption>
//             <tbody>
//               <tr className="bg-white border-b">
//                 <th
//                   scope="row"
//                   className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
//                 >
//                   User Name
//                 </th>
//                 <td className="px-6 py-4">{session?.user.username}</td>
//               </tr>
//               <tr className="bg-white border-b">
//                 <th
//                   scope="row"
//                   className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
//                 >
//                   Email
//                 </th>
//                 <td className="px-6 py-4">{session?.user.email}</td>
//               </tr>
//               <tr className="bg-white border-b">
//                 <th
//                   scope="row"
//                   className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
//                 >
//                   Phone Number
//                 </th>
//                 <td className="px-6 py-4">{session?.user.phone}</td>
//               </tr>
//               <tr className="bg-white border-b">
//                 <th
//                   scope="row"
//                   className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
//                 >
//                   Address
//                 </th>
//                 <td className="px-6 py-4">{session?.user.address}</td>
//               </tr>
//               <tr className="bg-white border-b">
//                 <th
//                   scope="row"
//                   className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
//                 >
//                   Country
//                 </th>
//                 <td className="px-6 py-4">{session?.user.country}</td>
//               </tr>
//               <tr className="bg-white border-b">
//                 <th
//                   scope="row"
//                   className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
//                 >
//                   City
//                 </th>
//                 <td className="px-6 py-4">{session?.user.city}</td>
//               </tr>
//               <tr className="bg-white border-b">
//                 <th
//                   scope="row"
//                   className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
//                 >
//                   Postal/Zip Code
//                 </th>
//                 <td className="px-6 py-4">{session?.user.zipCode}</td>
//               </tr>
//             </tbody>
//           </table>
//         </div>
//       )}
//       <h1>gfdg</h1>
//     </>
//   );
// }

import React from 'react'

export default function page() {
  return (
    <div>page</div>
  )
}
