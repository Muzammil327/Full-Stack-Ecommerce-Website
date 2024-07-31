import React from "react";

export default function Select({
  id,
  value,
  setValue,
  children,
}: {
  id: string;
  value: string;
  setValue: (categoryId: string) => void;
  children: React.ReactNode;
}) {
  return (
    <select
      id={id}
      value={value}
      onChange={(e) => setValue(e.target.value)}
      className="block w-full py-4 pl-3 bg-gray-50 border mt-2 shadow-sm border-gray-300 text-gray-900 text-sm rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 transition-all focus:transition-all hover:transition-all"
    >
      {children}
    </select>
  );
}
