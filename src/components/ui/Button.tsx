import React, { ReactNode } from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  className?: string;
  type?: "button" | "submit" | "reset";
  title?: string;
  disabled?: boolean;
  onClick?: () => void;
  loading?: boolean;
  variant?: "outline" | "solid" | "link";
}

export default function Button({
  children,
  className = "",
  type = "button",
  title,
  disabled = false,
  onClick,
  loading = false,
  variant = "outline",
  ...props
}: ButtonProps) {
  const variantClasses = {
    outline:
      "border-[1px] border-solid border-color1 hover:bg-color1 hover:text-color3 text-color1",
    solid: "bg-color1 hover:bg-color2 text-color3 ",
    link: "text-color1 hover:text-color2 hover:underline",
  };

  return (
    <button
      className={`
        ${className}
        ${variantClasses[variant]}
        outline-none block justify-center items-center rounded-md shadow-sm text-base font-medium focus:outline-none duration-300 ease-in-out cursor-pointer h-12 px-4 disabled:cursor-not-allowed
        ${loading ? "cursor-not-allowed opacity-50" : ""}
      `}
      onClick={onClick}
      disabled={disabled || loading}
      aria-label={title}
      type={type}
      {...props}
    >
      {children}
    </button>
  );
}
