import React, { useState } from "react";
import { GrFormAdd } from "react-icons/gr";
import { GrFormSubtract } from "react-icons/gr";
import { categories } from "../data";

interface StoreTagsProps {
  filterItem: (title: string) => void;
  catgeorySet: string;
  subCatgeorySet: string;
}

const StoreTags: React.FC<StoreTagsProps> = ({
  filterItem,
  catgeorySet,
  subCatgeorySet,
}) => {
  const [isTagsOpen, setIsTagsOpen] = useState(false);

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
          {categories
            .filter((data) => data.id === catgeorySet)
            .map((data) => (
              <React.Fragment key={data.id}>
                {data.subCategories
                  ?.filter((subData) => subData.id === subCatgeorySet)
                  .map((subDatas) => (
                    <React.Fragment key={data.id}>
                      {subDatas.tags?.map((subDatas) => (
                         <ul className="flex items-center" key={subDatas.name}>
                         <li
                           className="ml-3 text-sm text-gray-600 cursor-pointer"
                           onClick={() => filterItem(subDatas.name)}
                         >
                           {subDatas.name}
                         </li>
                       </ul>
                      ))}
                    </React.Fragment>
                  ))}
              </React.Fragment>
            ))}
        </div>
      </div>
    </div>
  );
};

export default StoreTags;
