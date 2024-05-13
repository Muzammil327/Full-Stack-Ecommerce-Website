import React, { useState } from "react";
import { GrFormAdd } from "react-icons/gr";
import { GrFormSubtract } from "react-icons/gr";
import { sections } from "@/src/components/layout/navbar/data";

interface Props {
  filterItem: (title: string) => void;
}

const StoreSubCategory: React.FC<Props> = ({ filterItem }) => {
  const [isSubCategoryOpen, setIsSubCategoryOpen] = useState(false);

  const toggleSubCategoryOptions = () => {
    setIsSubCategoryOpen(!isSubCategoryOpen);
  };

  return (
    <div className="border-b border-gray-200 py-6">
      <h3 className="-my-3 flow-root">
        <button
          type="button"
          onClick={toggleSubCategoryOptions}
          className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500"
        >
          <span className="font-medium text-gray-900">Sub Category</span>
          <span className="ml-6 flex items-center">
            {isSubCategoryOpen ? <GrFormSubtract size={24} /> : <GrFormAdd size={24} />}
          </span>
        </button>
      </h3>

      <div className={`pt-6 ${isSubCategoryOpen ? "" : "hidden"}`}>
        <div className="space-y-4">
          {sections.map((data) => (
            <ul className="flex items-center" key={data.name}>
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

export default StoreSubCategory;
