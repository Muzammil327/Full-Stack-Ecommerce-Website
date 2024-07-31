import React, { ChangeEvent } from "react";

interface InputProps {
  type: "text" | "email" | "password" | "number" | "tel"; // Adjusted types for more specific input types
  value: string | number; // Changed value type to accept both string and number
  placeholder: string;
  name: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void; // Updated onChange to accept ChangeEvent
}

export default function Input({
  type,
  value,
  placeholder,
  onChange,
  name,
}: InputProps) {
  return (
    <input
      name={name}
      id={name}
      type={type}
      value={value}
      onChange={onChange}
      className="w-full border border-gray-300 py-3 pl-3 rounded-md mt-2 shadow-sm outline-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 transition-all focus:transition-all hover:transition-all"
      placeholder={placeholder}
    />
  );
}
