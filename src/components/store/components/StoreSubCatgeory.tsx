"use client";
import React, { useState } from "react";
import { GrFormAdd } from "react-icons/gr";
import { GrFormSubtract } from "react-icons/gr";
import { SubCatgeory } from "@/src/utils/fetchSubCatgeory";

interface Props {
  filterItem: (title: string, _id: string) => void;
  catgeorySet: string;
}

const StoreSubCategory: React.FC<Props> = ({ filterItem, catgeorySet }) => {
  const [isSubCategoryOpen, setIsSubCategoryOpen] = useState(false);

  const { error, loading, subCatgeory } = SubCatgeory();
  if (error) return <h1>Error from store catgeory.</h1>;

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
          {loading ? (
            ""
          ) : (
            <React.Fragment>
              {subCatgeory.map((data: any) =>
                data.cat
                  .filter((subData: any) => subData._id === catgeorySet) // Filter by subData._id
                  .map((subData: any) => (
                    <React.Fragment key={data._id}>
                      <ul className="flex items-center">
                        <li
                          className="ml-3 text-sm text-gray-600 cursor-pointer"
                          onClick={() => filterItem(data.name, data._id)}
                        >
                          {data.name}{" "}
                        </li>
                      </ul>
                    </React.Fragment>
                  ))
              )}
            </React.Fragment>
          )}
        </div>
      </div>
    </div>
  );
};

export default StoreSubCategory;
