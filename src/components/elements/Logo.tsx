import React from "react";
import ImageContainer from "../ui/Image";

export default function Logo() {
  return (
    <div className="max-w-400 mx-auto">
      <ImageContainer
        src="https://res.cloudinary.com/desggllml/image/upload/w_200,h_200,c_fill,e_improve,e_sharpen/v1723461642/smi-logo_fmmcqy.png"
        alt="SMI shop"
        height={388}
        width={1446}
        className="w-full h-auto"
        sizes="(max-width: 200px) 100vw, 400px"
        priority
      />
    </div>
  );
}
