import React from "react";
import UserAction from "./UserAction";

export default function ShareButton() {
  return (
    <div className="flex items-center justify-between">
      <div className=" my-5 flex items-center justify-between gap-4">
        <button className="py-3 px-6 rounded-md text-white border-2 border-solid border-red-400">
          <svg
            fill="#000000"
            width="24px"
            height="24px"
            viewBox="0 0 36 36"
            version="1.1"
            preserveAspectRatio="xMidYMid meet"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title>share-solid</title>
            <path
              className="clr-i-solid clr-i-solid-path-1"
              d="M27.53,24a5,5,0,0,0-3.6,1.55L11.74,19.45a4.47,4.47,0,0,0,0-2.8l12.21-6.21a5.12,5.12,0,1,0-1.07-1.7L10.79,14.89a5,5,0,1,0,0,6.33l12.06,6.07A4.93,4.93,0,0,0,22.54,29a5,5,0,1,0,5-5Z"
            ></path>
            <rect x="0" y="0" width="36" height="36" fill-opacity="0" />
          </svg>
        </button>
      </div>

      <UserAction />
    </div>
  );
}
