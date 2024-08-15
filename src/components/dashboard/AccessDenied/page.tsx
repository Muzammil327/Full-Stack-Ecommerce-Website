import React from "react";
import Image from "next/image";

export default function AccessDenied() {
  return (
    <div className="flex items-center justify-center w-full h-auto py-28">
      <Image
        src="/access-denied.png"
        alt="Acesss Denied"
        title="Acesss Denied"
        height={500}
        width={500}
      />
    </div>
  );
}
