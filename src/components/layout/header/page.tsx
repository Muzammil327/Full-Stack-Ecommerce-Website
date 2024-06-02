import React from "react";
import Link from "next/link";
import SubHeaderSocial from "@/src/components/layout/header/SubHeaderSocial";

export default function Header() {
  return (
    <header className="grid md:grid-cols-2 grid-cols-1 flex-wrap md:justify-start justify-center items-center px-6 mx-auto border-b py-2">
      <div>
        <ul className="flex gap-4 md:justify-start justify-center items-center">
          <li>
            <Link href="#" className="text-sm">
              About Us Muhammad Muzammil Safdar
            </Link>
          </li>
          <li>
            <Link href="#" className="text-sm">
              Privacy
            </Link>
          </li>
          <li>
            <Link href="#" className="text-sm">
              FAQ
            </Link>
          </li>
        </ul>
      </div>
      <div className="md:flex hidden justify-between items-center">
        <SubHeaderSocial />
      </div>
    </header>
  );
}
