'use client'
import React, { useState } from "react";

import { GrFormAdd } from "react-icons/gr";
import { GrFormSubtract } from "react-icons/gr";

interface PriceRange {
  id: number;
  lowPrice: number;
  highPrice: number;
}

interface StorePriceProps {
  filterItem: (lowPrice: number, highPrice: number) => void;
}

const StorePrice: React.FC<StorePriceProps> = ({ filterItem }) => {
  const [isPriceOpen, setIsPriceOpen] = useState(false);

  const togglePriceOptions = () => {
    setIsPriceOpen((prevState) => !prevState);
  };

  return (
    <div className="border-b border-gray-200 py-6">
      <h3 className="-my-3 flow-root">
        <button
          type="button"
          onClick={togglePriceOptions}
          className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500"
        >
          <span className="font-medium text-gray-900">Price</span>
          <span className="ml-6 flex items-center">
            {isPriceOpen ? <GrFormSubtract size={24} /> : <GrFormAdd size={24} />}
          </span>
        </button>
      </h3>

      <div className={`pt-6 ${isPriceOpen ? "" : "hidden"}`}>
        <div className="space-y-4">
          {priceRanges.map((range) => (
            <ul className="flex items-center" key={range.id}>
              <li
                className="ml-3 text-sm text-gray-600 cursor-pointer"
                onClick={() => filterItem(range.lowPrice, range.highPrice)}
              >
                Rs. {range.lowPrice} to Rs. {range.highPrice}
              </li>
            </ul>
          ))}
        </div>
      </div>
    </div>
  );
};

const priceRanges: PriceRange[] = [
  { id: 1, lowPrice: 1, highPrice: 1000 },
  { id: 2, lowPrice: 1000, highPrice: 2000 },
  { id: 3, lowPrice: 2000, highPrice: 3000 },
  { id: 4, lowPrice: 3000, highPrice: 4000 },
  { id: 5, lowPrice: 4000, highPrice: 5000 },
  { id: 6, lowPrice: 5000, highPrice: 6000 },
  { id: 7, lowPrice: 6000, highPrice: 7000 },
];

export default StorePrice;
