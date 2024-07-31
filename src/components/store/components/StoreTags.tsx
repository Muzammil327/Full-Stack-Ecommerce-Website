"use client";
import React, { useState } from "react";
import { GrFormAdd } from "react-icons/gr";
import { GrFormSubtract } from "react-icons/gr";
import { Items } from "@/src/utils/fetchItems";

interface StoreTagsProps {
  filterItem: (title: string, _id: string) => void;
  catgeorySet: string;
  subCatgeorySet: string;
}

const StoreTags: React.FC<StoreTagsProps> = ({
  filterItem,
  catgeorySet,
  subCatgeorySet,
}) => {
  const [isTagsOpen, setIsTagsOpen] = useState(false);

  const { error, loading, items } = Items();
  if (error) return <h1>Error from store catgeory.</h1>;

  const toggleTagsOptions = () => {
    setIsTagsOpen((prevIsTagsOpen) => !prevIsTagsOpen);
  };

  return (
    <div className="border-b border-gray-200 py-6">
      <h3 className="-my-3 flow-root">
        <button
          type="button"
          onClick={toggleTagsOptions}
          className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500"
        >
          <span className="font-medium text-gray-900">Tags</span>
          <span className="ml-6 flex items-center">
            {isTagsOpen ? (
              <GrFormSubtract size={24} />
            ) : (
              <GrFormAdd size={24} />
            )}
          </span>
        </button>
      </h3>

      <div className={`pt-6 ${isTagsOpen ? "" : "hidden"}`}>
        <div className="space-y-4">
          {loading ? (
            ""
          ) : (
            <React.Fragment>
              {items.map((data: any) => {
                const filteredCats = data.cat.filter(
                  (catData: any) => catData._id === catgeorySet
                );
                const filteredSubcats = data.subcat.filter(
                  (subcatData: any) => subcatData._id === subCatgeorySet
                );

                return (
                  <React.Fragment key={data._id}>
                    {(filteredCats.length > 0 ||
                      filteredSubcats.length > 0) && (
                      <ul className="flex items-center">
                        <li
                          className="ml-3 text-sm text-gray-600"
                          onClick={() => filterItem(data.name, data._id)}
                        >
                          {data.name}
                        </li>
                      </ul>
                    )}
                  </React.Fragment>
                );
              })}
            </React.Fragment>
          )}
        </div>
      </div>
    </div>
  );
};

export default StoreTags;
