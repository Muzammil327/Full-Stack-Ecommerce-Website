import React from "react";

interface LabelProps {
  label: string;
  htmlFor: string; // Made htmlFor prop optional
}

const Label: React.FC<LabelProps> = ({ label, htmlFor }) => {
  return (
    <label
      htmlFor={htmlFor}
      className={`font-medium tracking-wide text-gray-700 text-sm`}
    >
      {label}
    </label>
  );
};

export default Label;
