import React from "react";
import Container from "@/src/components/ui/Container";
import Image from "next/image";
import LoadingLink from "@/src/components/ui/Loading/LoadingLink";

export default function Footer() {
  return (
    <footer className="bg-slate-200">
      <Container>
        <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4 py-12">
          <div className="first">
            <div className="max-w-240 mx-auto">
              <Image
                src="/smi-logo.png"
                alt="SMI shop"
                title="SMI shop"
                height={91}
                width={400}
                className="w-60 h-auto"
              />
            </div>
            <ul>
              <li className="text-slate-900 my-2 md:text-base text-sm">
                <span className="font-semibold text-base pr-1">Address:</span>
                Punjab, Pakistan
              </li>

              <li className="text-slate-900 my-2 md:text-base text-sm">
                <span className="font-semibold text-base pr-1">Phone:</span> +92
                318 4910 327
              </li>

              <li className="text-slate-900 my-2 md:text-base text-sm">
                <span className="font-semibold text-base pr-1">Email:</span>{" "}
                smistore528982@gmail.com
              </li>
            </ul>
          </div>
          <div className="second">
            <h3 className="text-lg font-bold mb-3 text-black">Useful Links</h3>
            <ul className="grid grid-cols-2 gap-2 items-center">
              <li className="mb-2 md:text-base text-base text-slate-800">
                <LoadingLink link="/" class_name="link">
                  Home
                </LoadingLink>
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
              <button className="bg1 md:py-3 py-2 md:px-6 px-4 font-medium outline-none">
                Subscribe
              </button>
            </div>
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
