import Image from "next/image";
import React from "react";

export default function LoadingProductCard() {
  return (
    <div className="card relative border shadow rounded-md p-2">
      <div className="animate-pulse flex flex-col">
        <div className="w-full aspect-h-1 aspect-w-1 overflow-hidden rounded-lg bg-gray-100 group-hover:opacity-75">
          <div className="h-40 rounded w-2/12"></div>
        </div>
        <div className="mt-4 flex flex-col">
          <div className="flex items-center justify-between">
            {/* Adjust loading animations for category and price */}
            <div className="h-6 bg-slate-700 rounded w-3/12"></div>
            <div className="h-6 bg-slate-700 rounded w-2/12"></div>
          </div>
          {/* Adjust loading animation for product name */}
          <div className="h-6 bg-slate-700 rounded w-8/12 mt-1"></div>
        </div>
      </div>
    </div>
  );
}
