import React, { useState } from "react";
import { GrFormAdd } from "react-icons/gr";
import { GrFormSubtract } from "react-icons/gr";

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
          {items.map((data) => (
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

export default StoreTags;

const items = [
  { name: "Tops", href: "#" },
  { name: "Pants", href: "#" },
  { name: "Sweaters", href: "#" },
  { name: "T-Shirts", href: "#" },
  { name: "Jackets", href: "#" },
  { name: "Activewear", href: "#" },
  { name: "Watches", href: "#" },
  { name: "Wallets", href: "#" },
  { name: "Bags", href: "#" },
  { name: "Sunglasses", href: "#" },
  { name: "Hats", href: "#" },
  { name: "Belts", href: "#" },
];
