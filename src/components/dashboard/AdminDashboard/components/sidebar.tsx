"use client";
import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import Link from "next/link";
import Logo from "@/src/components/elements/Logo";
import { FaBars, FaTimes } from "react-icons/fa";

interface SidebarDataIprops {
  id: number;
  title: String;
  link: string;
}

export default function AdminSidebar() {
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
                        {SidebarDataAdmin.map((data: SidebarDataIprops) => (
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
      <button
        type="button"
        className="bg1 px-2 py-2 z-30 rounded-tl rounded-bl fixed top-36 right-0"
        onClick={() => setOpen(true)}
      >
        <span className="absolute -inset-0.5" />
        <span className="sr-only">Open menu</span>
        <FaBars />
      </button>
    </>
  );
}

const SidebarDataAdmin: SidebarDataIprops[] = [
  {
    id: 0,
    title: "Products Manage",
    link: "/dashboard/admin/products",
  },
  {
    id: 1,
    title: "Orders Manage",
    link: "/admin/orders",
  },
  {
    id: 2,
    title: "Users Manage",
    link: "/admin/users",
  },
  {
    id: 3,
    title: "Platform Manage",
    link: "/dashboard/admin/platform",
  },
  {
    id: 4,
    title: "Size Manage",
    link: "/dashboard/admin/size",
  },
  {
    id: 5,
    title: "Color Manage",
    link: "/dashboard/admin/color",
  },
];
