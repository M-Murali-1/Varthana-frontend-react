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
        className={`border w-full px-4 py-2 rounded-md `}
        placeholder={data.placeholder}
        onChange={(e)=>data.handleChange(e)}
        required={data.required}
      />
      {data.error&&<p className="text-xs text-end mt-1 text-red-500">{data.error}</p>}
    </div>
  );
}

export default InputFieldComponent;
