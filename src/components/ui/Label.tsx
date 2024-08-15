import React from "react";

interface LabelProps {
  label?: string; // Optional label text
  htmlFor?: string; // Optional htmlFor attribute
  className?: string; // Optional custom class name
  children?: React.ReactNode; // Optional children elements
  ariaLabel?: string; // Optional aria-label for accessibility
}

const Label: React.FC<LabelProps> = ({
  label,
  htmlFor,
  className = "",
  children,
  ariaLabel,
}) => {
  return (
    <label
      htmlFor={htmlFor}
      className={`font-medium tracking-wide text-gray-700 text-sm ${className}`}
      aria-label={ariaLabel || label} // Set aria-label for accessibility
    >
      {label}
      {children}
    </label>
  );
};

export default Label;
