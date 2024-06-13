import React, { useState } from "react";
import { GrFormAdd } from "react-icons/gr";
import { GrFormSubtract } from "react-icons/gr";
import { categories } from "../data";

interface Props {
  filterItem: (title: string) => void;
  catgeorySet: string;
}

const StoreSubCategory: React.FC<Props> = ({ filterItem, catgeorySet }) => {
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
            {isSubCategoryOpen ? (
              <GrFormSubtract size={24} />
            ) : (
              <GrFormAdd size={24} />
            )}
          </span>
        </button>
      </h3>

      <div className={`pt-6 ${isSubCategoryOpen ? "" : "hidden"}`}>
        <div className="space-y-4">
          {categories
            .filter((data) => data.id === catgeorySet)
            .map((data) => (
              <React.Fragment key={data.id}>
                {data.subCategories?.map((subData) => (
                  <ul className="flex items-center" key={subData.name}>
                    <li
                      className="ml-3 text-sm text-gray-600 cursor-pointer"
                      onClick={() => filterItem(subData.name)}
                    >
                      {subData.name}
                    </li>
                  </ul>
                ))}
              </React.Fragment>
            ))}
        </div>
      </div>
    </div>
  );
};

export default StoreSubCategory;
