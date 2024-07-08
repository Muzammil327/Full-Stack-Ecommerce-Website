import React, { ReactNode } from "react";

export default function Buttons({
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
    <button className={`${className} button_bg cursor-pointer`} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
}
