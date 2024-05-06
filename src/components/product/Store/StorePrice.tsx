import React, { useState } from "react";

import AddSVG from "@/src/svg/AddSVG";
import MinusSVG from "@/src/svg/MinusSVG";
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
            {isPriceOpen ? <AddSVG /> : <MinusSVG />}
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
  { id: 1, lowPrice: 400, highPrice: 800 },
  { id: 2, lowPrice: 800, highPrice: 1200 },
  { id: 3, lowPrice: 1200, highPrice: 1600 },
  { id: 4, lowPrice: 1600, highPrice: 2000 },
];

export default StorePrice;
