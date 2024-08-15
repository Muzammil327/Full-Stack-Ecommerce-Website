import React, { ChangeEvent } from "react";

// Define a type for the possible input types
type InputType = "text" | "email" | "password" | "number" | "tel" | "search";

// Define an interface for the input props
interface InputProps {
  type: InputType;
  value: string | number;
  placeholder?: string; // Make placeholder optional
  name: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onFocus?: () => void; // Add optional onFocus handler
  onBlur?: () => void; // Add optional onBlur handler
  className?: string; // Add optional className for additional styling
  disabled?: boolean; // Add disabled state
  ariaLabel?: string; // Add aria-label for accessibility
}

// Define the Input component
const Input: React.FC<InputProps> = ({
  type,
  value,
  placeholder,
  onChange,
  name,
  onFocus,
  onBlur,
  className = "", // Default to an empty string if no className is provided
  disabled = false, // Default to false if disabled is not provided
  ariaLabel,
}) => {
  return (
    <input
      name={name}
      id={name}
      type={type}
      value={value}
      onChange={onChange}
      onFocus={onFocus}
      onBlur={onBlur}
      className={`w-full border border-gray-300 py-3 pl-3 rounded-md mt-2 shadow-sm outline-none focus:outline-none focus:ring-color2 focus:border-color2 transition-all hover:transition-all ${className}`}
      placeholder={placeholder}
      disabled={disabled}
      aria-label={ariaLabel}
    />
  );
};

export default Input;
