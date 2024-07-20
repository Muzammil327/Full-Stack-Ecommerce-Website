import React from "react";
import Link from "next/link";
import { BsFacebook, BsInstagram, BsWhatsapp } from "react-icons/bs";
import { Links, Container } from "@/src/components/ui/ui";

export default function Header() {
  return (
    <header className="border-b py-2">
      <Container>
        <div className="grid md:grid-cols-2 grid-cols-1 flex-wrap md:justify-start justify-center items-center">
          <ul className="flex gap-4 md:justify-start justify-center items-center">
            <li>
              <Links slug="#" className="text-sm" aria-label="About Us">
                About Us
              </Links>
            </li>
            <li>
              <Links slug="#" className="text-sm" aria-label="Privacy">
                Privacy
              </Links>
            </li>
            <li>
              <Links slug="#" className="text-sm" aria-label="FAQ">
                FAQ
              </Links>
            </li>
          </ul>
          <div className="md:flex hidden justify-between items-center">
            <HeaderSocial />
          </div>
        </div>
      </Container>
    </header>
  );
}

export function HeaderSocial() {
  return (
    <ul className="flex gap-6">
      <li>
        <Link href="https://web.facebook.com/smistore7/" target="_blank" aria-label="Facebook">
          <BsFacebook />
        </Link>
      </li>
      <li>
        <Link href="https://www.instagram.com/smistore7/" target="_blank" aria-label="Instagram">
          <BsInstagram />
        </Link>
      </li>
      <li>
        <Link href="https://wa.me/message/SF5VZYSETIYXN1" target="_blank" aria-label="Whatsapp">
          <BsWhatsapp />
        </Link>
      </li>
    </ul>
  );
}
