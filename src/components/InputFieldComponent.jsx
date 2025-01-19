import React from "react";

function InputFieldComponent({ data }) {
  console.log(data);

  return (
    <div className="mb-2">
      <label
        htmlFor={data.id}
        className="block text-sm font-medium text-gray-700 mb-2"
      >
        {data.title}
      </label>
      <input
        id={data.id}
        type={data.type}
        value={data.value}
        className="border w-full px-4 py-2 rounded-md "
        placeholder={data.placeholder}
        onChange={data.handleChange}
        required={data.required}
      />
    </div>
  );
}

export default InputFieldComponent;
