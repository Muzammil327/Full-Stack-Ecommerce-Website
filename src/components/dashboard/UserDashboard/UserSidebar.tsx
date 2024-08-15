"use client";
import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import Link from "next/link";
import Logo from "@/src/components/elements/Logo";
import { FaBars, FaTimes } from "react-icons/fa";
import Button from "../../ui/Button";

interface SidebarDataIprops {
  id: number;
  title: String;
  link: string;
}

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
                      <FaTimes />
                    </button>
                  </div>
                  <div className=" px-4 py-4 mt-12">
                    <Logo />
                    <ul role="list" className="mt-6 flex flex-col space-y-6">
                      <>
                        {SidebarData.map((data: SidebarDataIprops) => (
                          <li key={data.id} className="flow-root ">
                            <Link
                              href={`${data.link}`}
                              className="-m-2 block p-2 text-gray-500 border-b border-gray-200"
                              onClick={() => setOpen(false)}
                            >
                              {data.title}
                            </Link>
                          </li>
                        ))}
                      </>
                    </ul>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition.Root>
      </div>
      <Button
        className="!px-3 !h-10 z-30 fixed top-44 right-0"
        variant="solid"
        onClick={() => setOpen(true)}
        title="open navbar"
      >
        <span className="absolute -inset-0.5" />
        <span className="sr-only">Open menu</span>
        <FaBars />
      </Button>
    </>
  );
}

const SidebarData: SidebarDataIprops[] = [
  {
    id: 0,
    title: "Profile",
    link: "/dashboard/",
  },
  {
    id: 1,
    title: "Carts",
    link: "/cart/",
  },
  {
    id: 1,
    title: "Wishlist",
    link: "/wishlist/",
  },
  {
    id: 3,
    title: "Active Orders",
    link: "/dashboard/active-order/",
  },
  {
    id: 3,
    title: "Address",
    link: "/dashboard/address/",
  },
];
