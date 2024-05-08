import React from "react";

export default function LoadingCart() {
  return (
    <div className="card relative border shadow rounded-md p-2 w-full my-2">
      <div className="animate-pulse flex w-full py-4 items-center justify-between px-3">
        <div className="h-6 bg-slate-700 rounded w-3/12 mt-1"></div>
        <div className="h-6 bg-slate-700 rounded w-3/12 mt-1"></div>
        <div className="h-6 bg-slate-700 rounded w-3/12 mt-1"></div>
      </div>
    </div>
  );
}
