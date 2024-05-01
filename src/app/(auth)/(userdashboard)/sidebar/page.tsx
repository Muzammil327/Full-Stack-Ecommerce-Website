import Link from "next/link";
import React from "react";

export default function UserSidebar() {
  return (
    <>
      <div className="bg-slate-100 h-screen py-4 md:block hidden">
        <ul>
          <li className="border-b border-solid border-gray-300 hover:bg-slate-200 text-black py-3 flex items-center justify-center">
            <Link href="/profile">Dashboard</Link>
          </li>
          <li className="border-b border-solid border-gray-300 hover:bg-slate-200 text-black py-3 flex items-center justify-center">
            <Link href="/profile/address">Addresses</Link>
          </li>
          <li className="border-b border-solid border-gray-300 hover:bg-slate-200 text-black py-3 flex items-center justify-center">
            <Link href="/dashboard/product">Order history</Link>
          </li>
          <li className="border-b border-solid border-gray-300 hover:bg-slate-200 text-black py-3 flex items-center justify-center">
            <Link href="/dashboard/product">Wishlist</Link>
          </li>
        </ul>
      </div>
      <button className="md:hidden block bg-red-400 fixed top-16 py-2 px-3 text-white rounded-tl-md rounded-bl-md right-0">
        Open
      </button>
    </>
  );
}
