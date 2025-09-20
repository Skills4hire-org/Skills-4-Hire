import React from "react";

interface InputFieldProps {
  type?: string;
  placeholder: string;
}

const InputField: React.FC<InputFieldProps> = ({
  type = "text",
  placeholder,
}) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#222BDE]"
    />
  );
};

export default InputField;
