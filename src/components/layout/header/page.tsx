import React from "react";
import Link from "next/link";
import { BsInstagram } from "react-icons/bs";
import { FaFacebook } from "react-icons/fa";

export default function Header() {
  return (
    <header className="grid md:grid-cols-2 grid-cols-1 flex-wrap md:justify-start justify-center items-center px-6 mx-auto border-b py-2">
      <section>
        <ul className="flex gap-4 md:justify-start justify-center items-center">
          <li>
            <Link href="#" className="text-sm">
              About Us
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
      </section>
      <section className="md:flex hidden justify-between items-center">
        <ul className="flex gap-4">
          <li>
            <Link href="/">
              <FaFacebook />
            </Link>
          </li>
          <li>
            <Link href="/">
              <BsInstagram />
            </Link>
          </li>
        </ul>
      </section>
    </header>
  );
}
