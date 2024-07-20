import React, { ReactNode } from "react";
import { roboto, montserrat } from "@/src/app/font";

export default function Button({
  children,
  className,
  disabled,
  onClick,
  title,
}: {
  children: ReactNode;
  className?: string;
  title?: string;
  disabled?: boolean;
  onClick?: () => void;
}) {
  return (
    <button
      className={`${className} button_default px-3 ${montserrat.className}`}
      onClick={onClick}
      disabled={disabled}
      aria-label={title}
    >
      {children}
    </button>
  );
}
