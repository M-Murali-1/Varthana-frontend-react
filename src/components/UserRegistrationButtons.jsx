import React from "react";

function UserRegistrationButtons({ type, handleUpdateClose, isValid }) {
  return (
    <div
      className={`${type == "Update Details" ? "flex justify-between" : ""}`}
    >
      {type === "Update Details" && (
        <button
          className={`bg-red-500  ${
            type == "Update Details" ? "w-2/5" : "w-full"
          } text-white py-2 mt-2 rounded-md`}
          onClick={handleUpdateClose}
        >
          Close
        </button>
      )}
      <button
        type="submit"
        className={`bg-blue-500 text-white ${
          type == "Update Details" ? "w-2/5" : "w-full"
        } py-2 mt-2 rounded-md ${
          isValid ? "hover:bg-blue-600" : "opacity-50 cursor-not-allowed"
        }`}
        disabled={!isValid}
      >
        {type == "Register" && "Submit"}
        {type == "Update Details" && "Update"}
        {type == "Add New Employee" && "Add Employee"}
      </button>
    </div>
  );
}

export default UserRegistrationButtons;
