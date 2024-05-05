import SearchSVG from "@/src/svg/searchSVG";
import Link from "next/link";
import React from "react";

export default function Search() {
  return (
    <>
      <div className="flex lg:ml-6">
        <Link href="/search" className="p-2 text-gray-400 hover:text-gray-500">
          <span className="sr-only">Search</span>
          <SearchSVG />
        </Link>
      </div>
    </>
  );
}
