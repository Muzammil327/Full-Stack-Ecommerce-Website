import React from "react";

export default function LoadingProductCard() {
  return (
    <div className="border bg-slate-300 shadow rounded-md p-2">
      <div className="animate-pulse flex flex-col">
        <div className="bg-slate-700 h-52 w-full"></div>
        <div className="mt-5 flex flex-col gap-4">
          <div className="h-6 bg-slate-700 rounded w-6/12 "></div>
          <div className="h-12 bg-slate-700 rounded "></div>
        </div>
      </div>
    </div>
  );
}
