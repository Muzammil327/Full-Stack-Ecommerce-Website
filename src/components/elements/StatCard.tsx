import React from "react";

export default function StatCard({
  length,
  name,
  svg,
  error,
}: {
  length: number;
  name: string;
  svg: any;
  error: string | null;
}) {
  return (
    <div className="profileCard h-32 border bg-white px-4 py-5 md:mt-0 mt-4 rounded-md transition-all shadow relative">
      <div className="icon shadow-sm h-12 text-xl flex items-center justify-center w-12 border rounded-full">
        {svg}
      </div>
      {error && <span className="text-red-400">{error}</span>}
      <h4 className="py-2 text-lg font-medium">{name}</h4>
      <span className="absolute top-2 text-4xl right-6 text-gray-200 transition-all">
        {length}
      </span>
    </div>
  );
}
