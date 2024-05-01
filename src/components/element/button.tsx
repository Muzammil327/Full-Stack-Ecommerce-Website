import React, { ReactNode } from "react";

interface ButtonProps {
  variant?: "sm" | "md" | "lg";
  bg?: string;
  width?: string;
  icon?: React.ComponentType<{ className?: string }>;
  children: ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  variant = "md",
  bg = "blue",
  width,
  icon: Icon,
  children,
  ...rest
}) => {
  const getButtonSize = () => {
    switch (variant) {
      case "sm":
        return "px-2 py-1 text-sm";
      case "lg":
        return "px-4 py-2 text-lg";
      case "md":
      default:
        return "px-3 py-2";
    }
  };

  const getBackgroundColor = () => {
    switch (bg) {
      case "red":
        return "bg-red-500 hover:bg-red-600";
      case "blue":
        return "bg-blue-500 hover:bg-blue-600";
      case "green":
        return "bg-green-500 hover:bg-green-600";
      default:
        return `bg-${bg}-500 hover:bg-${bg}-600`;
    }
  };

  const buttonSize = getButtonSize();
  const backgroundColor = getBackgroundColor();

  return (
    <button
      className={`rounded-md text-white py-2 px-6 my-2 ${buttonSize} ${backgroundColor} ${
        width ? `w-${width}` : ""
      } flex items-center justify-center`}
      {...rest}
    >
      {Icon && <Icon className="mr-2" />}
      {children}
    </button>
  );
};

export default Button;
