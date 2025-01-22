import React from "react";

function AddressComponent({ type, data }) {
  return (
    <>
      {type === "Update Details" && (
        <div className="mb-2">
          <label
            htmlFor={data.id}
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            {data.title}
          </label>
          <textarea
            id={data.id}
            className="border w-full px-4 py-2 rounded-md"
            value={data.value}
            onChange={data.handleChange}
            rows="5"
          />
        </div>
      )}
    </>
  );
}

export default AddressComponent;