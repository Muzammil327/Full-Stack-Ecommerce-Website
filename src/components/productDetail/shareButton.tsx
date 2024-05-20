import React, { useState } from "react";
import { FaShareNodes } from "react-icons/fa6";
import {
  FacebookShareButton,
  FacebookIcon,
  WhatsappShareButton,
  WhatsappIcon,
  TwitterShareButton,
  TwitterIcon,
  EmailShareButton,
  EmailIcon,
} from "react-share";

export default function ShareButton() {
  const [isShareButton, setIsShareButton] = useState(false);
  return (
    <div className="relative inline-block text-left">
      <div>
        <button
          type="button"
          onClick={() => setIsShareButton(!isShareButton)}
          className="group inline-flex justify-center text-sm font-medium bg-red-400 hover:bg-white transition-all hover:text-black py-3 px-6 rounded-md text-white border-2 border-solid border-red-400 w-full"
          id="menu-button"
          aria-expanded={isShareButton}
          aria-haspopup="true"
        >
          <FaShareNodes size={24} className="" />
        </button>
      </div>

      <div
        className={`absolute right-0 z-10 mt-2 w-60 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none ${
          isShareButton ? "" : "hidden"
        }`}
        role="menu"
        aria-orientation="vertical"
        aria-labelledby="menu-button"
      >
        <ul className="py-1" role="none">
          {data.map((data: any) => {
            return (
              <li
                className="text-gray-500 inline-block cursor-pointer px-2 py-2 text-sm"
                onClick={() => {
                  setIsShareButton(false);
                }}
                key={data.id}
              >
                {data.icon}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

const data = [
  {
    id: 0,
    icon: (
      <FacebookShareButton url={"https://facebook.com/"}>
        <FacebookIcon size={32} round />
      </FacebookShareButton>
    ),
  },
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
