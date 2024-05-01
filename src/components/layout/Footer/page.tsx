import Container from "@/components/element/container/page";
import Link from "next/link";
import React from "react";
import Logo from "@/components/layout/Navbar/logo";
import FSocial from "./fSocial";

export default function Footer() {
  return (
    <footer className="bg-slate-200">
      <Container>
        <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4 py-12">
          <div className="first">
            <Logo />
            <ul>
              <li className="text-slate-900 my-2 md:text-base text-sm">
                <span className="font-semibold text-base">Address:</span> 60-49
                Road 11378 New York
              </li>

              <li className="text-slate-900 my-2 md:text-base text-sm">
                <span className="font-semibold text-base">Phone:</span> +65
                11.188.888
              </li>

              <li className="text-slate-900 my-2 md:text-base text-sm">
                <span className="font-semibold text-base">Email:</span>{" "}
                hello@colorlib.com
              </li>
            </ul>
          </div>
          <div className="second">
            <h3 className="text-lg font-bold mb-3 text-black">Useful Links</h3>
            <ul className="grid grid-cols-2 gap-2 items-center">
              <li className="mb-2 md:text-base text-base text-slate-800">
                <Link href="/" className="link">
                  Home
                </Link>
              </li>
              <li className="mb-2 md:text-base text-base text-slate-800">
                About Us
              </li>
              <li className="mb-2 md:text-base text-base text-slate-800">
                Contact Us
              </li>
              <li className="mb-2 md:text-base text-base text-slate-800">
                About Our Shop
              </li>
              <li className="mb-2 md:text-base text-base text-slate-800">
                Secure Shopping
              </li>
              <li className="mb-2 md:text-base text-base text-slate-800">
                Delivery infomation
              </li>
              <li className="mb-2 md:text-base text-base text-slate-800">
                Our Services
              </li>
              <li className="mb-2 md:text-base text-base text-slate-800">
                Projects
              </li>
              <li className="mb-2 md:text-base text-base text-slate-800">
                Contact
              </li>
              <li className="mb-2 md:text-base text-base text-slate-800">
                Innovation
              </li>
            </ul>
          </div>
          <div className="third">
            <h3 className="text-lg font-bold mb-3 text-black">
              Join Our Newsletter Now
            </h3>
            <p className="mb-7 text-gray-600 text-sm">
              Get E-mail updates about our latest shop and special offers.
            </p>

            <div className="input min-w-full flex items-center my-4">
              <input
                type="text"
                className="md:h-12 h-10 outline-none border-none px-4 w-full"
                placeholder="Enter your Email"
              />
              <button className="bg-indigo-400 md:py-3 py-2 px-6 text-white font-bold">
                Subscribe
              </button>
            </div>

            <FSocial />
          </div>
        </div>
      </Container>
      <div className="py-4 border-t-[1px] border-solid border-gray-300 ">
        <Container>
          <div className="">
            <p className="text-gray-500 md:text-left text-center text-sm">
              Copyright ©2024 All rights reserved.
            </p>
          </div>
        </Container>
      </div>
    </footer>
  );
}
