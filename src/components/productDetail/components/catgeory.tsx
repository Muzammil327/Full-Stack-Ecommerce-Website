import Link from "next/link";
import React from "react";
import { FaChevronRight } from "react-icons/fa";

interface ProductDetailCatgeoryProps {
  data: {
    category: string;
    subCategory: string;
    items: string;
  };
}
export default function ProductDetailCatgeory({
  data,
}: ProductDetailCatgeoryProps) {
  return (
    <div className="cat">
      <ul className="flex md:gap-3 gap-2">
        <li className="text-gray-500 flex md:gap-3 gap-2 items-center">
          {data.category}
          <FaChevronRight className="text-xs text-indigo-500" />
        </li>
        <li className="text-gray-500 flex md:gap-3 gap-2 items-center">
          {data.subCategory}
          <FaChevronRight className="text-xs text-indigo-500" />
        </li>
        <li className="text-gray-500 flex md:gap-3 gap-2 items-center">
          <Link href={`/catgeory/${data.items}`}>{data.items}</Link>
        </li>
      </ul>
    </div>
  );
}
