import React from "react";
import { LoadingTableRow } from "../Loading/LoadingTableRow";

interface TableProps {
  columns: string[];
  loading?: boolean;
  cellCount: number;
  children: React.ReactNode;
}

export default function Table2({
  columns,
  loading,
  children,
  cellCount,
}: TableProps) {
  return (
    <div className="relative overflow-x-auto sm:rounded-lg mt-8">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 border rounded-bl-lg rounded-br-lg">
        <thead className="text-xs text-gray-700 uppercase bg-indigo-100 dark:bg-gray-700 dark:text-gray-400 whitespace-nowrap">
          <tr>
            {columns.map((column, index) => (
              <th key={index} scope="col" className="px-6 py-3">
                {column}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="w-full">
          {loading ? (
            [...Array(4)].map((_, index) => (
              <LoadingTableRow cellCount={cellCount} key={index} />
            ))
          ) : (
            <>{children}</>
          )}
        </tbody>
      </table>
    </div>
  );
}

interface TableRowProps {
  columns: Array<string | number>; // columns can be either string or number
  tableHeading: string;
  children?: React.ReactNode;
}

export function TableRow({ tableHeading, columns, children }: TableRowProps) {
  return (
    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-indigo-50 dark:hover:bg-gray-600">
      <th scope="col" className="px-6 py-4">
        {tableHeading}
      </th>
      {columns.map((column, index) => (
        <td key={index} scope="col" className="px-6 py-4">
          {column}
        </td>
      ))}
      {children && (
        <td className="flex px-6 py-4 whitespace-nowrap">{children}</td>
      )}
    </tr>
  );
}
