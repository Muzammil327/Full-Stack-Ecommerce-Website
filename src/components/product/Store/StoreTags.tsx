import React, { useState } from "react";

import AddSVG from "@/src/svg/AddSVG";
import MinusSVG from "@/src/svg/MinusSVG";

import stlyes from "@/view/store/store.module.scss";

interface TagData {
  id: number;
  title: string;
}

interface StoreTagsProps {
  filterItem: (title: string) => void;
}

const StoreTags: React.FC<StoreTagsProps> = ({ filterItem }) => {
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
          className={stlyes.btn2}
        >
          <span className="font-medium text-gray-900">Tags</span>
          <span className="ml-6 flex items-center">
            {isTagsOpen ? <AddSVG /> : <MinusSVG />}
          </span>
        </button>
      </h3>

      <div className={`pt-6 ${isTagsOpen ? "" : "hidden"}`}>
        <div className="space-y-4">
          {tagData.map((data) => (
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

const tagData: TagData[] = [
  { id: 0, title: "Watches" },
  { id: 1, title: "Shirts" },
  { id: 2, title: "Earbuds" },
];

export default StoreTags;
