import React, { ReactNode } from "react";

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
    <button className={`${className} cursor-pointer`} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
}
