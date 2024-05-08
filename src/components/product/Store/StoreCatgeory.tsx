import React, { useState } from "react";
import AddSVG from "@/src/svg/AddSVG";
import MinusSVG from "@/src/svg/MinusSVG";
import stlyes from "@/view/store/store.module.scss";

interface CategoryDataTypes {
  id: number;
  title: string;
}

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
          className={stlyes.btn2}
        >
          <span className="font-medium text-gray-900">Category</span>
          <span className="ml-6 flex items-center">
            {isCategoryOpen ? <AddSVG /> : <MinusSVG />}
          </span>
        </button>
      </h3>

      <div className={`pt-6 ${isCategoryOpen ? "" : "hidden"}`}>
        <div className="space-y-4">
          {categoryData.map((data) => (
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
          ))}
        </div>
      </div>
    </div>
  );
};

const categoryData: CategoryDataTypes[] = [
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

export default StoreCategory;
