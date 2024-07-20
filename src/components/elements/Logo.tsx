import Image from "next/image";
import React from "react";
import ImageContainer from "../ui/Image";

export default function Logo() {
  return (
    <div className="max-w-400 mx-auto">
      <ImageContainer
        src="/smi-logo.png"
        alt="SMI shop"
        height={91}
        width={400}
        className="w-full h-auto"
        sizes="(max-width: 200px) 100vw, 400px"
        priority
      />
    </div>
  );
}
