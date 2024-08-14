import React from "react";
import { BsFacebook, BsInstagram, BsWhatsapp } from "react-icons/bs";
import { Links, Container } from "@/src/components/ui/ui";
import {
  FACEBOOOK_SOCIAL_URL,
  INSTRAGRAM_SOCIAL_URL,
  WHATSAPP_SOCIAL_URL,
} from "@/src/utils/constant";

export default function Header() {
  return (
    <header className="border-b py-2">
      <Container>
        <div className="grid md:grid-cols-2 grid-cols-1 flex-wrap md:justify-start justify-center items-center">
          <ul className="flex gap-4 md:justify-start justify-center items-center">
            <li>
              <Links slug="#" className="text-sm" title="About Us" prefetch>
                About Us
              </Links>
            </li>
            <li>
              <Links slug="#" className="text-sm" title="Privacy" prefetch>
                Privacy
              </Links>
            </li>
            <li>
              <Links slug="#" className="text-sm" title="FAQ" prefetch>
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
        <Links
          slug={FACEBOOOK_SOCIAL_URL}
          target="_blank"
          title="Facebook"
          prefetch
        >
          <BsFacebook />
        </Links>
      </li>
      <li>
        <Links
          slug={INSTRAGRAM_SOCIAL_URL}
          target="_blank"
          title="Instagram"
          prefetch
        >
          <BsInstagram />
        </Links>
      </li>
      <li>
        <Links
          slug={WHATSAPP_SOCIAL_URL}
          target="_blank"
          title="Whatsapp"
          prefetch
        >
          <BsWhatsapp />
        </Links>
      </li>
    </ul>
  );
}
