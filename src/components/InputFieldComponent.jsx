import React, { useState } from "react";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
function InputFieldComponent({ data }) {
  // console.log(data);
  if (data.type == "password") {
    data.isPassword = true;
  }
  const [visible, setVisible] = useState(false);
  function handlePassword(e) {
    console.log("clikced..!", visible);

    data.type = visible ? "password" : "text";
    setVisible(!visible);
  }
  return (
    <div className="mb-2">
      <label
        htmlFor={data.id}
        className="block text-sm font-medium text-gray-700 mb-2"
      >
        {data.title}
      </label>
      <div className="relative">
        <input
          id={data.id}
          type={data.type}
          value={data.value}
          className={`border w-full px-4 py-2 rounded-md `}
          placeholder={data.placeholder}
          onChange={(e) => data.handleChange(e)}
          required={data.required}
        />
        {data.isPassword && (
          <div
            className="absolute bottom-2 right-2 opacity-50"
            onClick={handlePassword}
          >
            {data.type == "password" && <VisibilityOutlinedIcon />}
            {data.type == "text" && <VisibilityOffOutlinedIcon />}
          </div>
        )}
      </div>
      {data.error && data.value != "" && (
        <p className="text-xs text-end mt-1 text-red-500">{data.error}</p>
      )}
    </div>
  );
}

export default InputFieldComponent;
