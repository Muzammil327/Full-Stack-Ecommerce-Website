import React, { useState } from "react";
import { GrFormAdd } from "react-icons/gr";
import { GrFormSubtract } from "react-icons/gr";

interface Props {
  filterItem: (title: string) => void;
}

const StoreCategory: React.FC<Props> = ({ filterItem }) => {
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);

  const toggleCategoryOptions = () => {
    setIsCategoryOpen(!isCategoryOpen);
  };

  return (
    <div className="border-b border-gray-200 py-6">
      <h3 className="-my-3 flow-root">
        <button
          type="button"
          onClick={toggleCategoryOptions}
          className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500"
        >
          <span className="font-medium text-gray-900">Category</span>
          <span className="ml-6 flex items-center">
            {isCategoryOpen ? (
              <GrFormSubtract size={24} />
            ) : (
              <GrFormAdd size={24} />
            )}
          </span>
        </button>
      </h3>

      <div className={`pt-6 ${isCategoryOpen ? "" : "hidden"}`}>
        <div className="space-y-4">
          {categories.map((data) => (
            <ul className="flex items-center" key={data.id}>
              {/* <input
                    value="brown"
                    type="checkbox"
                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                  /> */}
              <li
                className="ml-3 text-sm text-gray-600 cursor-pointer"
                onClick={() => filterItem(data.name)}
              >
                {data.name}
              </li>
            </ul>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StoreCategory;

const categories = [
  { id: "women", name: "Women" },
  { id: "men", name: "Men" },
];
