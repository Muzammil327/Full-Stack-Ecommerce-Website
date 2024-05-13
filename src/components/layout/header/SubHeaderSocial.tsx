import Link from "next/link";
import React from "react";
import Facebook from "@/src/components/svg/Facebook";
import Instagram from "@/src/components/svg/Instagram";

export default function SubHeaderSocial() {
  return (
    <>
      <ul className="flex gap-4">
        <li>
          <Link href="/">
            <Facebook />
          </Link>
        </li>
        <li>
          <Link href="/">
            <Instagram />
          </Link>
        </li>
      </ul>
    </>
  );
}
