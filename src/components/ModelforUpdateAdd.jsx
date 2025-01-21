import React from "react";
import { Modal } from "@mui/material";
import UserRegistration from "./UserRegistration";
function ModelforUpdateAdd({
  open,
  handleClose,
  type,
  data,
  handleUpdate = () => {},
  handleAdd = () => {},
}) {
  return (
    <Modal open={open} onClose={handleClose}>
      <div className="flex justify-center items-center ">
        <div className="bg-white rounded-lg p-5 m-10 max-h-[80vh] overflow-y-auto shadow-lg max-w-lg md:max-w-3xl">
          <UserRegistration
            handleClose={handleClose}
            data={data}
            type={type}
            handleAdd={handleAdd}
            handleUpdate={handleUpdate}
          />
        </div>
      </div>
    </Modal>
  );
}

export default ModelforUpdateAdd;
