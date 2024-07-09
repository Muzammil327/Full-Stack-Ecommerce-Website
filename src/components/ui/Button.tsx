import React, { ReactNode } from "react";
import { roboto, montserrat } from "@/src/app/font";

export default function Button({
  children,
  className,
  disabled,
  onClick,
}: {
  children: ReactNode;
  className?: string;
  disabled?: boolean;
  onClick?: () => void;
}) {
  return (
    <button
      className={`${className} button_default px-3 ${montserrat.className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
