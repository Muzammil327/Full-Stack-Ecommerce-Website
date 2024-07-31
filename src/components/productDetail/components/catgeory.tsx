import React from "react";
import { FaChevronRight } from "react-icons/fa";

interface ProductDetailCatgeoryProps {
  data: {
    cat: [];
    item: [];
    scat: [];
  };
}
export default function ProductDetailCatgeory({
  data,
}: ProductDetailCatgeoryProps) {
  return (
    <div className="cat">
      <ul className="flex md:gap-3 gap-2">
        <li className="text-gray-500 flex md:gap-3 gap-2 items-center capitalize">
          {data.cat.map((data: any) => data.name)}
          <FaChevronRight className="text-xs text-indigo-500" />
        </li>
        <li className="text-gray-500 flex md:gap-3 gap-2 items-center">
        {data.scat.map((data: any) => data.name)}
          <FaChevronRight className="text-xs text-indigo-500" />
        </li>
      </ul>
    </div>
  );
}
export function ProductDetailItems({ data }: ProductDetailCatgeoryProps) {
  return (
    <div className="cat">
      <span className="py-1 text-lg font-semibold">Tags:</span>
      <ul className="flex">
        {data.item.map((data: any, index) => {
          return (
            <li className="text-gray-600 mr-2 capitalize" key={index}>
              {data.name}, 
            </li>
          );
        })}
      </ul>
    </div>
  );
}
