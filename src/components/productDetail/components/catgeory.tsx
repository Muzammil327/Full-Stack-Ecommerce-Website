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
          <Link href={`/catgeory?cat=${data.category}`}>{data.category}</Link>
          <FaChevronRight className="text-xs text-indigo-500" />
        </li>
        <li className="text-gray-500 flex md:gap-3 gap-2 items-center">
          <Link href={`/catgeory?subCat=${data.subCategory}`}>
            {data.subCategory}
          </Link>{" "}
          <FaChevronRight className="text-xs text-indigo-500" />
        </li>
        <li className="text-gray-500 flex md:gap-3 gap-2 items-center">
          <Link href={`/catgeory?tags=${data.items}`}>{data.items}</Link>
        </li>
      </ul>
    </div>
  );
}
