import React from "react";

function LoadingTableCell() {
  return (
    <div className="animate-pulse bg-slate-700 h-7 rounded w-full mt-1"></div>
  );
}

// Loading placeholder for a table row
export function LoadingTableRow({ cellCount }: { cellCount: number }) {
  const cells = Array.from({ length: cellCount }, (_, index) => (
    <td key={index} className="py-3 md:px-5 px-2">
      <LoadingTableCell />
    </td>
  ));

  return (
    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
      {cells}
    </tr>
  );
}
