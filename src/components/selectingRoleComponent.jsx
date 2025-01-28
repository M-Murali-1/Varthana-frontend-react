import React from "react";

const SelectingRoleComponent = ({ type="", data }) => {
  return (
    <div className="mb-2">
      <label
        htmlFor={data.id}
        className="block text-sm font-medium text-gray-700 mb-2"
      >
        {type==="Update Details" && "Update Role"}
        {(type==="Register" || type==="Add New Employee") && "Select Your Role"}
        {/* {type != "Update Details" ? "Select Your Role" : "Update Role"} */}
      </label>
      <select
        id={data.id}
        value={data.value}
        onChange={data.handleChange}
        className="border w-full px-4 py-2 rounded-md "
      >
        <>
        <option value="">{type===""?"Select By Role":"None"}</option>
          {data.options.map((element) => (
            <option key={element} value={element}>{element}</option>
          ))}
        </>
      </select>
    </div>
  );
};

export default SelectingRoleComponent;
