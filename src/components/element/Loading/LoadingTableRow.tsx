import React from "react";

export default function LoadingTableRow() {
  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg mx-4">
      <table className="w-full animate-pulse text-sm text-left rtl:text-right text-gray-500">
        <tbody>
          <tr className="bg-white border-b">
            <th
              scope="row"
              className="px-6 py-6 font-medium whitespace-nowrap rounded w-8/12"
            ></th>
            <td className="px-6 py-6 rounded w-8/12"></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
