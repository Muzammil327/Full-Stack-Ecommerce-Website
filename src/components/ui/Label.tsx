import React from "react";

interface LabelProps {
  label: string; // Optional label text
  htmlFor: string; // Optional htmlFor attribute
  className?: string; // Optional custom class name
  children?: React.ReactNode; // Optional children elements
  }

const Label: React.FC<LabelProps> = ({
  label,
  htmlFor,
  className = "",
  children,
}) => {
  return (
    <label
      htmlFor={htmlFor}
      className={`font-medium tracking-wide text-gray-700 text-sm ${className}`}
      aria-label={label} // Set aria-label for accessibility
    >
      {label}
      {children}
    </label>
  );
};

export default Label;
