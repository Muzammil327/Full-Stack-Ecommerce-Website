import React from "react";

export default function CountDown() {
  return (
    <div>
      <ul className="flex items-center md:justify-center gap-5">
        <li className="flex flex-col items-center justify-center bg-red-500 md:rounded-full rounded md:h-24 h-16 md:w-24 w-16 text-white">
          <span className="md:text-2xl text-lg font-semibold">02</span>
          <span className="text-sm">DAYS</span>
        </li>
        <li className="flex flex-col items-center justify-center bg-red-500 md:rounded-full rounded md:h-24 h-16 md:w-24 w-16 text-white">
          <span className="md:text-2xl text-lg font-semibold">10</span>
          <span className="text-sm">HOURS</span>
        </li>
      </ul>
    </div>
  );
}
