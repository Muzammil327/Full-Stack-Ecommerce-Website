"use client";
import React, { useState } from "react";
interface catgeoryDataTypes {
  id: number;
  title: string;
}
export default function StoreCatgeory({ filterItem }: any) {
  const [isCatgeoryOpen, setIsCatgeoryOpen] = useState(false);

  const toggleColorOptions = () => {
    setIsCatgeoryOpen(!isCatgeoryOpen);
  };
  return (
    <div className="border-b border-gray-200 py-6">
      <h3 className="-my-3 flow-root">
        <button
          type="button"
          onClick={toggleColorOptions}
          className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500"
        >
          <span className="font-medium text-gray-900">Category</span>
          <span className="ml-6 flex items-center">
            {isCatgeoryOpen ? (
              <>
                <svg
                  className="h-5 w-5 transition-transform transform"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fill-rule="evenodd"
                    d="M4 10a.75.75 0 01.75-.75h10.5a.75.75 0 010 1.5H4.75A.75.75 0 014 10z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
              </>
            ) : (
              <>
                <svg
                  className="h-5 w-5 transition-transform transform"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" />
                </svg>
              </>
            )}
          </span>
        </button>
      </h3>

      <div className={`pt-6 ${isCatgeoryOpen ? "" : "hidden"}`}>
        <div className="space-y-4">
          {catgeoryData.map((data: catgeoryDataTypes) => {
            return (
              <>
                <ul className="flex items-center" key={data.id}>
                  {/* <input
                    value="brown"
                    type="checkbox"
                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                  /> */}
                  <li
                    className="ml-3 text-sm text-gray-600 cursor-pointer"
                    onClick={() => filterItem(data.title)}
                  >
                    {data.title}
                  </li>
                </ul>
              </>
            );
          })}
        </div>
      </div>
    </div>
  );
}

const catgeoryData: catgeoryDataTypes[] = [
  {
    id: 0,
    title: "Men",
  },
  {
    id: 1,
    title: "Women",
  },
  {
    id: 2,
    title: "Children",
  },
];
