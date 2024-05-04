"use client";
import React, { useState } from "react";

export default function StoreSort({ filteritemsLH, filteritemsHL }: any) {
  const [isSortOpen, setIsSortOpen] = useState(false); // State for sort menu

  const toggleSortOptions = () => {
    setIsSortOpen(!isSortOpen);
  };
  const filteritemsLowtoHigh = () => {
    filteritemsHL("");
    filteritemsLH("pricelowtohigh");
    setIsSortOpen(false);
  };
  const filteritemsHightoLow = () => {
    filteritemsLH("");
    filteritemsHL("pricehightolow");
    setIsSortOpen(false);
  };

  return (
    <div className="flex items-center">
      <div className="relative inline-block text-left">
        <div>
          <button
            type="button"
            onClick={toggleSortOptions}
            className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900"
            id="menu-button"
            aria-expanded={isSortOpen}
            aria-haspopup="true"
          >
            Sort
            <svg
              className={`-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500 ${
                isSortOpen ? "rotate-180" : ""
              }`}
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>

        {/* Sort options */}
        <div
          className={`absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none ${
            isSortOpen ? "" : "hidden"
          }`}
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="menu-button"
        >
          <ul className="py-1" role="none">
            {/* <a
              href="#"
              className="font-medium text-gray-900 block px-4 py-2 text-sm"
              role="menuitem"
              id="menu-item-0"
            >
              Most Popular
            </a>
            <a
              href="#"
              className="text-gray-500 block px-4 py-2 text-sm"
              role="menuitem"
              id="menu-item-1"
            >
              Best Rating
            </a>
            <a
              href="#"
              className="text-gray-500 block px-4 py-2 text-sm"
              role="menuitem"
              id="menu-item-2"
            >
              Newest
            </a> */}

            <li
              className="text-gray-500 block cursor-pointer px-4 py-2 text-sm"
              onClick={filteritemsLowtoHigh}
            >
              Price: Low to High{" "}
            </li>
            <li
              className="text-gray-500 block cursor-pointer px-4 py-2 text-sm"
              onClick={filteritemsHightoLow}
            >
              Price: High to Low{" "}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

const data = [
  {
    id: 0,
    title: "Price: Low to High",
    filter: "pricelowtohigh",
  },
  {
    id: 0,
    title: "Price: High to Low",
    filter: "pricehightolow",
  },
];
