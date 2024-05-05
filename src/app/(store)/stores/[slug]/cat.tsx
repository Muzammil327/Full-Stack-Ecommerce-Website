import React from "react";

interface IProps {
  catgeory: string;
  subCateory: string;
}
export default function Cat({ catgeory, subCateory }: IProps) {
  return (
    <div className="cat">
      <ul className="flex gap-3">
        <li className="text-gray-500 flex gap-3 items-center">
          <span>{catgeory}</span>
          <span>
            {" "}
            <svg
              version="1.1"
              height="10"
              width="10"
              id="Layer_1"
              xmlns="http://www.w3.org/2000/svg"
              x="0px"
              y="0px"
              viewBox="0 0 512.001 512.001"
            >
              <path
                className="fill-[#0089FF]"
                d="M388.819,239.537L156.092,6.816c-9.087-9.089-23.824-9.089-32.912,0.002
	c-9.087,9.089-9.087,23.824,0.002,32.912l216.27,216.266L123.179,472.272c-9.087,9.089-9.087,23.824,0.002,32.912
	c4.543,4.544,10.499,6.816,16.455,6.816c5.956,0,11.913-2.271,16.457-6.817L388.819,272.45c4.366-4.364,6.817-10.283,6.817-16.455
	C395.636,249.822,393.185,243.902,388.819,239.537z"
              />
            </svg>
          </span>
        </li>
        <li className="text-gray-500 flex gap-3 items-center">
          <span>{subCateory}</span>
          <span>
            {" "}
            <svg
              version="1.1"
              height="10"
              width="10"
              id="Layer_1"
              xmlns="http://www.w3.org/2000/svg"
              x="0px"
              y="0px"
              viewBox="0 0 512.001 512.001"
            >
              <path
                className="fill-[#0089FF]"
                d="M388.819,239.537L156.092,6.816c-9.087-9.089-23.824-9.089-32.912,0.002
	c-9.087,9.089-9.087,23.824,0.002,32.912l216.27,216.266L123.179,472.272c-9.087,9.089-9.087,23.824,0.002,32.912
	c4.543,4.544,10.499,6.816,16.455,6.816c5.956,0,11.913-2.271,16.457-6.817L388.819,272.45c4.366-4.364,6.817-10.283,6.817-16.455
	C395.636,249.822,393.185,243.902,388.819,239.537z"
              />
            </svg>
          </span>
        </li>
        <li className="text-gray-500 flex gap-3 items-center">Shirts</li>
      </ul>
    </div>
  );
}
