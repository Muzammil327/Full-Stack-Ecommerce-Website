import React, { ChangeEvent } from "react";

// Define an interface for the textarea props
interface TextareaProps {
  value: string; // Textareas typically take strings as values
  placeholder?: string; // Optional placeholder
  name: string;
  onChange?: (event: ChangeEvent<HTMLTextAreaElement>) => void; // Change handler specific to textarea
  onFocus?: () => void; // Optional onFocus handler
  onBlur?: () => void; // Optional onBlur handler
  className?: string; // Optional className for styling
  disabled?: boolean; // Optional disabled state
  ariaLabel?: string; // Aria-label for accessibility
  rows?: number; // Optional number of rows for the textarea
  cols?: number; // Optional number of columns for the textarea
}

// Define the Textarea component
const Textarea: React.FC<TextareaProps> = ({
  value,
  placeholder,
  onChange,
  name,
  onFocus,
  onBlur,
  rows = 5, // Default number of rows if not provided
  cols,
  className = "", // Default to an empty string if no className is provided
  disabled = false, // Default to false if disabled is not provided
  ariaLabel,
}) => {
  return (
    <textarea
      name={name}
      id={name}
      value={value}
      onChange={onChange}
      onFocus={onFocus}
      onBlur={onBlur}
      rows={rows}
      cols={cols}
      className={`w-full border border-gray-300 py-3 pl-3 rounded-md mt-2 shadow-sm outline-none focus:outline-none focus:ring-color2 focus:border-color2 transition-all hover:transition-all ${className}`}
      placeholder={placeholder}
      disabled={disabled}
      aria-label={ariaLabel}
    />
  );
};

export default Textarea;
