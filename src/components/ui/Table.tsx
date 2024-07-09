import React from "react";

export default function Table({
  children,
  data,
}: {
  children: React.ReactNode;
  data: {
    t1: string;
    t2?: string;
    t3?: string;
    t4?: string;
    t5?: string;
    t6?: string;
  };
}) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full text-sm text-left rtl:text-right text-gray-500">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
          <tr>
            {data.t1 && (
              <th scope="col" className="px-12 py-2">
                {data.t1}
              </th>
            )}
            {data.t2 && (
              <th scope="col" className="px-12 py-2">
                {data.t2}
              </th>
            )}
            {data.t3 && (
              <th scope="col" className="px-12 py-2">
                {data.t3}
              </th>
            )}
            {data.t4 && (
              <th scope="col" className="px-12 py-2">
                {data.t4}
              </th>
            )}
            {data.t5 && (
              <th scope="col" className="px-12 py-2">
                {data.t5}
              </th>
            )}
            {data.t6 && (
              <th scope="col" className="px-12 py-2">
                {data.t6}
              </th>
            )}
          </tr>
        </thead>
        <tbody className="w-full">{children}</tbody>
      </table>
    </div>
  );
}
