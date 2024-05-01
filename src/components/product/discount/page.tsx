import Link from "next/link";
import React from "react";
import CountDown from "./countdown";

export default function Discount() {
  return (
    <>
      <section className="bg-[url('/2.webp')] bg-no-repeat md:bg-left bg-center">
        <div className="py-28 md:text-center ml-6">
          <CountDown />
          <h3 className="lg:text-5xl md:text-4xl text-3xl font-semibold my-5">
            {" "}
            DEAL OF THE WEEK
          </h3>
          <p className="mb-8 text-xl">Him shed let them sixth saw light</p>
          <Link
            className="bg-black text-white py-3 px-8 rounded-full hover:text-black hover:bg-white transition-all hover:transition-all"
            href="#"
          >
            SHOP NOW
          </Link>
        </div>
      </section>
    </>
  );
}
