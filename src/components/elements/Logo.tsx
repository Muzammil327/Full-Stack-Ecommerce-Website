import React from "react";
import ImageContainer from "../ui/Image";
import { LOGO_IMAGE, LOGO_TITLE } from "@/src/utils/constant";

export default function Logo() {
  return (
    <div className="max-w-400 mx-auto">
      <ImageContainer
        src={LOGO_IMAGE}
        alt={LOGO_TITLE}
        height={388}
        width={1446}
        className="w-full h-auto"
        sizes="(max-width: 200px) 100vw, 400px"
        priority
      />
    </div>
  );
}
