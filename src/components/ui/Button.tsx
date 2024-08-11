import React, { ReactNode } from "react";
import { roboto, montserrat } from "@/src/app/font";

export default function Button({
  children,
  className,
  disabled,
  onClick,
  type,
  title,
}: {
  children: ReactNode;
  className?: string;
  type?: "submit" | "reset" | undefined;
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
      type={type}
    >
      {children}
    </button>
  );
}
