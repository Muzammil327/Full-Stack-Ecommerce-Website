"use client";

import Link from "next/link";
import React from "react";
import { useTimer } from "react-timer-hook";

export default function Discount() {
  const time = new Date();
  time.setSeconds(time.getSeconds() + 60 * 60 * 24 * 5); // 10 minutes timer

  const MyTimer: React.FC<{ expiryTimestamp: Date }> = ({
    expiryTimestamp,
  }) => {
    const { seconds, minutes, hours, days } = useTimer({
      expiryTimestamp,
      onExpire: () => console.warn("onExpire called"),
    });

    return (
      <>
        <ul className="flex items-center md:justify-center gap-5">
          <li className="flex flex-col items-center justify-center bg-red-500 md:rounded-full rounded md:h-24 h-16 md:w-24 w-16 text-white">
            <span className="md:text-2xl text-lg font-semibold">{days}</span>
            <span className="xl:text-base md:text-sm text-xs">DAYS</span>
          </li>
          <li className="flex flex-col items-center justify-center bg-red-500 md:rounded-full rounded md:h-24 h-16 md:w-24 w-16 text-white">
            <span className="md:text-2xl text-lg font-semibold">{hours}</span>
            <span className="xl:text-base md:text-sm text-xs">HOURS</span>
          </li>
          <li className="flex flex-col items-center justify-center bg-red-500 md:rounded-full rounded md:h-24 h-16 md:w-24 w-16 text-white">
            <span className="md:text-2xl text-lg font-semibold">{minutes}</span>
            <span className="xl:text-base md:text-sm text-xs">MINUTES</span>
          </li>
          <li className="flex flex-col items-center justify-center bg-red-500 md:rounded-full rounded md:h-24 h-16 md:w-24 w-16 text-white">
            <span className="md:text-2xl text-lg font-semibold">{seconds}</span>
            <span className="xl:text-base md:text-sm text-xs">SECONDS</span>
          </li>
        </ul>
      </>
    );
  };

  return (
    <div>
      <section className="bg-[url('/2.webp')] bg-no-repeat md:bg-left bg-center">
        <div className="py-28 md:text-center ml-6">
          <MyTimer expiryTimestamp={time} />

          <h3 className="lg:text-5xl md:text-4xl text-3xl font-semibold my-5">
            DEAL OF THE WEEK
          </h3>
          <p className="mb-8 text-xl">Him shed let them sixth saw light</p>
          <Link
            className="bg-black text-white py-3 px-8 rounded-full hover:text-black hover:bg-white transition-all hover:transition-all"
            href="/"
          >
            SHOP NOW
          </Link>
        </div>
      </section>
    </div>
  );
}
