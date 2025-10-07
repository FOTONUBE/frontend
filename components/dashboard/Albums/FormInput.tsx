"use client";
import React from "react";

type Props = {
  label: string;
  name: string;
  value: string | number | boolean;
  onChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => void;
  type?: string;
  placeholder?: string;
  textarea?: boolean;
};

export default function FormInput({
  label,
  name,
  value,
  onChange,
  type = "text",
  placeholder,
  textarea = false,
}: Props) {
  // Generamos un id para asociar label con input
  const id = `input-${name}`;

  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      {textarea ? (
        <textarea
          id={id}
          name={name}
          value={value as string}
          onChange={onChange}
          placeholder={placeholder}
          className="mt-1 block w-full border-2 border-gray-300 rounded-md shadow-sm p-2 min-h-10 max-h-32 overflow-y-auto"
        />
      ) : type === "checkbox" ? (
        <div className="flex items-center space-x-2 mt-1">
          <input
            id={id}
            className="h-4 w-4 border-2 border-gray-300 rounded focus:ring-cyan-500 accent-cyan-600"
            type="checkbox"
            name={name}
            checked={value as boolean}
            onChange={onChange}
          />
          <span>{placeholder}</span>
        </div>
      ) : (
        <input
          id={id}
          type={type}
          name={name}
          value={value as string | number}
          onChange={onChange}
          placeholder={placeholder}
          className="mt-1 block w-full border-2 border-gray-300 rounded-md shadow-sm p-2"
        />
      )}
    </div>
  );
}
