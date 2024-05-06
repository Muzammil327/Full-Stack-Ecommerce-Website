import AddSVG from "@/src/svg/AddSVG";
import MinusSVG from "@/src/svg/MinusSVG";
import React, { useState } from "react";

interface SubCategoryDataTypes {
  id: number;
  title: string;
}

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
            {isSubCategoryOpen ? <AddSVG /> : <MinusSVG />}
          </span>
        </button>
      </h3>

      <div className={`pt-6 ${isSubCategoryOpen ? "" : "hidden"}`}>
        <div className="space-y-4">
          {subCategoryData.map((data) => (
            <ul className="flex items-center" key={data.id}>
              <li
                className="ml-3 text-sm text-gray-600 cursor-pointer"
                onClick={() => filterItem(data.title)}
              >
                {data.title}
              </li>
            </ul>
          ))}
        </div>
      </div>
    </div>
  );
};

const subCategoryData: SubCategoryDataTypes[] = [
  {
    id: 0,
    title: "Clothing",
  },
  {
    id: 1,
    title: "Accessories",
  },
];

export default StoreSubCategory;
