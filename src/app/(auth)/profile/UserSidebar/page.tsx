"use client";
import CloseSVG from "@/src/svg/CloseSVG";
import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import Link from "next/link";
import Logo from "@/src/components/layout/Navbar/logo";

export default function UserSidebar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="bg-white">
        <Transition.Root show={open} as={Fragment}>
          <Dialog className="relative z-40" onClose={setOpen}>
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-black bg-opacity-25" />
            </Transition.Child>

            <div className="fixed inset-0 z-40 flex">
              <Transition.Child
                as={Fragment}
                enter="transition ease-in-out duration-300 transform"
                enterFrom="-translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="-translate-x-full"
              >
                <Dialog.Panel className="relative flex w-full max-w-xs flex-col overflow-y-auto bg-white pb-12 shadow-xl">
                  <div className="flex px-4 pb-2 absolute top-4 right-0">
                    <button
                      type="button"
                      className="relative -m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400"
                      onClick={() => setOpen(false)}
                    >
                      <span className="absolute -inset-0.5" />
                      <span className="sr-only">Close menu</span>
                      <CloseSVG />
                    </button>
                  </div>
                  <div className=" px-4 py-4 mt-12">
                    <Logo />
                    <ul role="list" className="mt-6 flex flex-col space-y-6">
                      <li className="flow-root border-b border-gray-200 py-2">
                        <Link
                          href="/profile"
                          className="-m-2 block p-2 text-gray-500"
                          onClick={() => setOpen(false)}
                        >
                          Dashboard
                        </Link>
                      </li>
                      <li className="flow-root border-b border-gray-200 py-2">
                        <Link
                          href="/profile/address"
                          className="-m-2 block p-2 text-gray-500"
                          onClick={() => setOpen(false)}
                        >
                          Addresses
                        </Link>
                      </li>
                      <li className="flow-root border-b border-gray-200 py-2">
                        <Link
                          href=""
                          className="-m-2 block p-2 text-gray-500"
                          onClick={() => setOpen(false)}
                        >
                          Pending Order
                        </Link>
                      </li>
                      <li className="flow-root border-b border-gray-200 py-2">
                        <Link
                          href=""
                          className="-m-2 block p-2 text-gray-500"
                          onClick={() => setOpen(false)}
                        >
                          Order history
                        </Link>
                      </li>
                      <li className="flow-root border-b border-gray-200 py-2">
                        <Link
                          href=""
                          className="-m-2 block p-2 text-gray-500"
                          onClick={() => setOpen(false)}
                        >
                          Wishlist
                        </Link>
                      </li>
                    </ul>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition.Root>
      </div>
      <button
        type="button"
        className="bg-red-400 px-2 py-2 z-30 rounded-tl rounded-bl text-white fixed top-36 right-0"
        onClick={() => setOpen(true)}
      >
        <span className="absolute -inset-0.5" />
        <span className="sr-only">Open menu</span>
        <svg
          width="24px"
          height="24px"
          viewBox="0 0 24 24"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g
            id="web-app"
            stroke="none"
            stroke-width="1"
            fill="none"
            fill-rule="evenodd"
          >
            <g id="bar" fill="#fff">
              <path
                d="M3,16 L21,16 L21,18 L3,18 L3,16 Z M3,11 L21,11 L21,13 L3,13 L3,11 Z M3,6 L21,6 L21,8 L3,8 L3,6 Z"
                id="Shape"
              ></path>
            </g>
          </g>
        </svg>
      </button>
    </>
  );
}
