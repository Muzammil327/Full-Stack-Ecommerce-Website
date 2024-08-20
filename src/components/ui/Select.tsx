import React from "react";

const Select = ({ options, selectedOption, onChange }: any) => {
  return (
    <div className="relative w-full mx-auto">
      <select
        value={selectedOption}
        onChange={onChange}
        className={`w-full appearance-none border border-gray-300 py-3 pl-3 rounded-md mt-2 shadow-sm outline-none focus:outline-none focus:ring-color2 focus:border-color2 transition-all hover:transition-all flex items-center justify-center`}
      >
        {options.map((option: any, index: any) => (
          <option key={index} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <div className="pointer-events-none absolute inset-y-0 text-xl right-0 px-2 text-gray-700 flex items-center justify-center">
        <svg
          className="fill-current h-6 w-6"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
        >
          <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
        </svg>
      </div>
    </div>
  );
};

export default Select;
