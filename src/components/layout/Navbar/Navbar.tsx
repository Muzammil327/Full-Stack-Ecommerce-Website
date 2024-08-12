"use client";
import { Fragment, useState } from "react";
import { Dialog, Popover, Transition } from "@headlessui/react";
import Link from "next/link";
import Logo from "@/src/components/elements/Logo";
import Container from "@/src/components/ui/Container";
import Auth from "@/src/components/layout/Navbar/auth";
import AuthMobile from "./authMobile";
import { FaBars, FaFacebook, FaInstagram, FaTimes } from "react-icons/fa";
import { SearchIcon } from "./search";
import { CatgeoryButton } from "../../home/HeroSlider";
import { Links, Button, ImageContainer } from "@/src/components/ui/ui";
import FavouriteIcon from "./Favourite";
import CartIcon from "./cart";
import { HeaderSocial } from "../header/page";

export interface Page {
  name: string;
  href: string;
  prefetch: boolean;
}

export default function NavbarView({ userId }: { userId: string }) {
  const [open, setOpen] = useState(false);

  return (
    <nav className="bg-white border-b mb-2">
      {/* Mobile menu */}
      <Transition.Root show={open} as={Fragment}>
        <Dialog className="relative z-50 lg:hidden" onClose={setOpen}>
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
                <div className="flex pb-2 px-4 absolute top-4 right-0">
                  <Button
                    className="button_outline !p-2"
                    onClick={() => setOpen(false)}
                  >
                    <span className="absolute -inset-0.5" />
                    <span className="sr-only">Close menu</span>
                    <FaTimes />
                  </Button>
                </div>

                <div className="relative xl:w-[250px] lg:w-[200px] sm:w-[170px] w-[130px] h-auto my-5 mx-auto">
                  <ImageContainer
                    src="https://res.cloudinary.com/desggllml/image/upload/w_200,h_60,e_improve,e_sharpen/v1723461642/smi-logo_fmmcqy.png"
                    alt="SMI shop mart"
                    height={388}
                    width={1446}
                    className="w-full h-auto"
                  />
                </div>
                <div className="space-y-6 border-t border-gray-200 px-4 py-8">
                  {navigation.pages.map((page: Page) => (
                    <div key={page.name} className="flow-root">
                      <Links
                        slug={page.href}
                        title="mobile menu"
                        prefetch={page.prefetch}
                        className="-m-2 block p-2 font-medium text-gray-900"
                        onClick={() => setOpen(false)}
                      >
                        {page.name}
                      </Links>
                    </div>
                  ))}
                </div>

                <AuthMobile userId={userId} setOpen={setOpen} />
                <div className="px-4 border-t border-gray-200 py-6 flex items-center justify-center">
                  <HeaderSocial />
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>

      {/* Desktop menu */}
      <div className="relative">
        <Container>
          <div className="flex items-center py-3">
            {/* logo  */}
            <div className="relative xl:w-[250px] lg:w-[200px] sm:w-[170px] w-[130px] h-auto">
            <ImageContainer
                src="https://res.cloudinary.com/desggllml/image/upload/w_200,h_50,e_improve,e_sharpen/v1723461642/smi-logo_fmmcqy.png"
                alt="SMI shop mart"
                height={388}
                width={1446}
                className="w-full h-auto"
                priority
              />
            </div>

            {/* menus */}
            <Popover.Group className="hidden lg:ml-8 lg:block lg:self-stretch">
              <div className="flex h-full space-x-10">
                {navigation.pages.map((page: Page) => (
                  <Link
                    href={page.href}
                    title="menu"
                    className="flex items-center text-sm font-medium"
                    key={page.name}
                  >
                    {page.name}
                  </Link>
                ))}
              </div>
            </Popover.Group>

            <div className="ml-auto flex items-center">
              <Auth userId={userId} />
              <CartIcon />
              <FavouriteIcon />
              <SearchIcon />
            </div>
          </div>
          <div className="lg:hidden flex items-center w-full gap-4">
            <CatgeoryButton />
            <Button
              onClick={() => setOpen(true)}
              className="button_solid !p-3"
              title="open navbar in mobile device"
            >
              <FaBars />
            </Button>
          </div>
        </Container>
      </div>
    </nav>
  );
}

const navigation = {
  pages: [
    { name: "Home", href: "/", prefetch: true },
    { name: "Stores", href: "/stores", prefetch: true },
    { name: "Blogs", href: "/", prefetch: true },
    { name: "Contact", href: "/", prefetch: true },
  ],
};
