import React, { useState } from "react";
import {
  FacebookShareButton,
  FacebookIcon,
  WhatsappShareButton,
  WhatsappIcon,
  TwitterShareButton,
  TwitterIcon,
} from "react-share";
import Button from "@/src/components/ui/Button";
import { FaShareNodes } from "react-icons/fa6";

let URL;
export default function ShareButton({
  urlCurrentPage,
}: {
  urlCurrentPage: string;
}) {
  const [isShareButton, setIsShareButton] = useState(false);
  const shareUrl = `https://full-stack-ecommerce-website-five.vercel.app/stores/${urlCurrentPage}/`;

  return (
    <div className="relative">
      <Button
        onClick={() => setIsShareButton(!isShareButton)}
        className="flex items-center justify-center"
        variant="outline"
        title="share on social media"
      >
        <FaShareNodes />
      </Button>
      <div
        className={`absolute right-0 z-10 mt-2 w-60 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none ${
          isShareButton ? "" : "hidden"
        }`}
        role="menu"
        aria-orientation="vertical"
        aria-labelledby="menu-button"
      >
        <ul className="py-1" role="none">
          <li
            className="text-gray-500 inline-block cursor-pointer px-2 py-2 text-sm"
            onClick={() => {
              setIsShareButton(false);
            }}
          >
            <FacebookShareButton url={shareUrl}>
              <FacebookIcon size={32} round />
            </FacebookShareButton>
          </li>
          <li
            className="text-gray-500 inline-block cursor-pointer px-2 py-2 text-sm"
            onClick={() => {
              setIsShareButton(false);
            }}
          >
            <WhatsappShareButton url={shareUrl}>
              <WhatsappIcon size={32} round />
            </WhatsappShareButton>
          </li>
        </ul>
      </div>
    </div>
  );
}

const data = [
  {
    id: 1,
    icon: (
      <WhatsappShareButton url={"https://web.whatsapp.com/"}>
        <WhatsappIcon size={32} round />
      </WhatsappShareButton>
    ),
  },
  {
    id: 2,
    icon: (
      <TwitterShareButton url={"https://twitter.com/"}>
        <TwitterIcon size={32} round />
      </TwitterShareButton>
    ),
  },
  // {
  //   id: 3,
  //   icon: (
  //     <EmailShareButton url={"https://facebook.com/"}>
  //       <EmailIcon size={32} round />
  //     </EmailShareButton>
  //   ),
  // },
];
