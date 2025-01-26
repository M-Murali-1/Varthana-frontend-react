import React from "react";

function UserRegistrationButtons({ type, handleUpdateClose, isValid }) {
  return (
    <div
      className={`${type == "Update Details" ? "flex justify-between" : ""}`}
    >
      {type === "Update Details" && (
        <button
          className={`bg-[#236d80]  ${
            type == "Update Details" ? "w-2/5" : "w-full"
          } text-white py-2 mt-2 rounded-md`}
          onClick={handleUpdateClose}
        >
          Close
        </button>
      )}
      <button
        type="submit"
        className={`bg-[#57A649] text-white opacity-50 ${
          type == "Update Details" ? "w-2/5" : "w-full"
        } py-2 mt-2 rounded-md ${
          isValid ? "hover:opacity-90 opacity-100" : "opacity-70 cursor-not-allowed"
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
