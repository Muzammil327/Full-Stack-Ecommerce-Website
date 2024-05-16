import Image from "next/image";
import React from "react";

export default function Logo() {
  return (
    <div className="max-w-400 mx-auto">
      <Image
        src="/smi-logo.png"
        alt="SMI shop"
        title="SMI shop"
        height={91}
        width={400}
        className="w-full h-auto"
        sizes="(max-width: 200px) 100vw, 400px"
        // layout="responsive"
      />
    </div>
  );
}
