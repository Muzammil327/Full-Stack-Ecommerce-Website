import Link from "next/link";
import React from "react";

export default function AdminSidebar() {
  return (
    <>
      <div className="bg-slate-100 h-screen py-4 md:block hidden">
        <ul>
          <li className="border-b border-solid border-gray-300 hover:bg-slate-200 text-black py-3 flex items-center justify-center">
            <Link href="/admin">Dashboard</Link>
          </li>
          <li className="border-b border-solid border-gray-300 hover:bg-slate-200 text-black py-3 flex items-center justify-center">
            <Link href="/admin/product">Add Products</Link>
          </li>
        </ul>
      </div>
      <button className="md:hidden block bg-red-400 fixed top-16 py-2 px-3 text-white rounded-tl-md rounded-bl-md right-0">
        Open
      </button>
    </>
  );
}
