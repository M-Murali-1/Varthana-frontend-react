import React, { useEffect, useState } from "react";
import InputFieldComponent from "./InputFieldComponent";
import { useReducer } from "react";
import { useNavigate } from "react-router-dom";
import UserRegistrationButtons from "./UserRegistrationButtons";
import SelectingRoleComponent from "./SelectingRoleComponent";
import {
  confirmPasswordValidation,
  emailValidation,
  nameValidation,
  passwordValidation,
  phoneNumberValidation,
} from "../utils/validations";
import axios from "axios";
import LinkComponent from "./LinkComponent";
import AddressComponent from "./AddressComponent";
let initialState = {
  name: "",
  username: "",
  phone_number: "",
  email_id: "",
  password: "",
  confirm_password: "",
  Role: "Junior Developer",
  address: "",
};
const reducer = (state, action) => {
  switch (action.type) {
    case "handleNameChange":
      return { ...state, name: action.payload.name };
    case "handleUserNameChange":
      return { ...state, username: action.payload.username };
    case "handlePhNumberChange":
      return { ...state, phone_number: action.payload.phone_number };
    case "handlePasswordChange":
      return { ...state, password: action.payload.password };
    case "handleConfirmPasswordChange":
      return { ...state, confirm_password: action.payload.confirm_password };
    case "handleEmailIdChange":
      return { ...state, email_id: action.payload.email_id };
    case "handleRoleChange":
      return { ...state, Role: action.payload.Role };
    case "handleAddressChange":
      return { ...state, address: action.payload.address };
    case "reset":
      return initialState;
  }
};

function UserRegistration({
  data = "",
  type = "",
  handleUpdate = () => {},
  handleClose = () => {},
  handleAdd = () => {},
}) {
  const [registerError, setRegisterError] = useState({ type: "", message: "" });
  console.log(Object.keys(initialState));
  const initailStateToUse =
    type === "Update Details"
      ? {
          ...initialState,
          ...Object.keys(initialState).reduce((acc, element) => {
            if (data.hasOwnProperty(element)) {
              acc[element] = data[element];
            }
            return acc;
          }, {}),
        }
      : initialState;
  const [details, dispatch] = useReducer(reducer, initailStateToUse);

  if (type === "Update Details") {
    delete details.password;
    delete details.confirm_password;
  }

  console.log("the data for the updating purpose is :", initialState);

  //console.log("the details while updating are  :", details);

  const isValid =
    !nameValidation(details.name) &&
    !phoneNumberValidation(details.phone_number) &&
    !emailValidation(details.email_id) &&
    (type == "Update Details" ||
      (!passwordValidation(details.password) &&
        !confirmPasswordValidation(
          details.confirm_password,
          details.password
        )));
  console.log("the form is valid :", isValid);

  console.log(details);
  useEffect(() => {
    handleErrorChange();
  }, [details]);
  function handleErrorChange() {
    if(registerError!="") {
      setRegisterError("")
    }
  }
  const navigate = useNavigate();
  function handleUpdateClose() {
    handleClose(false);
    dispatch({ type: "reset" });
  }
  function handleRegister(e) {
    e.preventDefault();
    const postEmployee = async () => {
      try {
        if (type == "Register") {
          let response = await axios.post(
            "http://localhost:8080/auth/register",
            details
          );
          let token = response.data.token;
          sessionStorage.setItem("token", token);
          navigate("/home-page");
        } else if (type == "Update Details") {
          handleUpdate(null);
          const token = sessionStorage.getItem("token");
          let response = await axios.patch(
            `http://localhost:8080/employee/update/${data.id}`,
            details,
            {
              headers: {
                Authorization: `${token}`,
              },
            }
          );
          handleClose(false);
          handleUpdate(data.id);
        } else if (type == "Add New Employee") {
          const token = sessionStorage.getItem("token");
          let response = await axios.post(
            "http://localhost:8080/employee/create",
            details,
            {
              headers: {
                Authorization: `${token}`,
              },
            }
          );
          handleClose();
          handleAdd(response.data.id);
        }
      } catch (err) {
        console.log(err);
        if (err.response.data) {
          setRegisterError(err.response.data);
        } else {
          setRegisterError({ message: "There is an error" });
        }
      }
    };
    postEmployee();
  }
  console.log(registerError, "this is the error1");

  let inputFieldsData1 = [
    {
      id: "name",
      title: "Name",
      type: "text",
      placeholder: "Enter your name",
      handleChange: (e) =>
        dispatch({
          type: "handleNameChange",
          payload: { name: e.target.value },
        }),
      value: details.name,
      required: true,
      error: nameValidation(details.name),
    },
    {
      id: "username",
      title: "Username",
      type: "text",
      placeholder: "Enter your username",
      handleChange: (e) =>
        dispatch({
          type: "handleUserNameChange",
          payload: { username: e.target.value },
        }),
      value: details.username,
      required: true,
    },
    {
      id: "phnumber",
      title: "Phone Number",
      type: "tel",
      placeholder: "Enter your mobile number",
      handleChange: (e) =>
        dispatch({
          type: "handlePhNumberChange",
          payload: { phone_number: e.target.value },
        }),
      value: details.phone_number,
      required: true,
      error:
        phoneNumberValidation(details.phone_number) ||
        (registerError.type == "PhoneNoError" && registerError.message),
    },
    {
      id: "email",
      title: "Email",
      type: "email",
      placeholder: "Enter your email",
      handleChange: (e) =>
        dispatch({
          type: "handleEmailIdChange",
          payload: { email_id: e.target.value },
        }),
      value: details.email_id,
      required: true,
      error:
        emailValidation(details.email_id) ||
        (registerError.type == "emailError" && registerError.message),
    },
  ];
  let inputFieldsData2 = [
    {
      id: "setpassword",
      title: "Set Password",
      type: "password",
      placeholder: "Enter your password",
      handleChange: (e) =>
        dispatch({
          type: "handlePasswordChange",
          payload: { password: e.target.value },
        }),
      value: details.password,
      required: true,
      error: passwordValidation(details.password),
    },
    {
      id: "confirmpassword",
      title: "Confirm Your Password",
      type: "password",
      placeholder: "Confirm Password",
      handleChange: (e) =>
        dispatch({
          type: "handleConfirmPasswordChange",
          payload: { confirm_password: e.target.value },
        }),
      value: details.confirm_password,
      required: true,
      error: confirmPasswordValidation(
        details.confirm_password,
        details.password
      ),
    },
  ];

  let addressInput = {
    id: "address",
    title: "Add Address",
    placeholder: "Add Address",
    handleChange: (e) =>
      dispatch({
        type: "handleAddressChange",
        payload: { address: e.target.value },
      }),
    value: details.address,
  };
  let selectingRoleInput = {
    id: "role",
    value: details.Role,
    handleChange: (e) =>
      dispatch({
        type: "handleRoleChange",
        payload: { Role: e.target.value },
      }),
    options: ["Junior Developer", "Senior Developer", "Admin"],
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-lg md:max-w-3xl">
      <h2 className="text-center text-2xl font-bold mb-6">{type}</h2>
      <form onSubmit={handleRegister}>
        <div className="flex gap-0 md:gap-10 flex-col md:flex-row">
          {/* Set 1 */}
          <div className="w-full md:w-1/2">
            {/* Field for name,username,phone number,email */}
            {inputFieldsData1.map((element) => (
              <InputFieldComponent key={element.title} data={element} />
            ))}
          </div>

          {/* Set 2 */}
          <div className="w-full md:w-1/2">
            {/* Field for password and confirm password */}
            {type != "Update Details" &&
              inputFieldsData2.map((element) => (
                <InputFieldComponent key={element.title} data={element} />
              ))}
            {/* Field for adding Address */}
            <AddressComponent type={type} data={addressInput} />
            {/* Field for selecting the role */}
            <SelectingRoleComponent type={type} data={selectingRoleInput} />

            {/* Button for submitting the form */}
            <UserRegistrationButtons
              type={type}
              handleUpdateClose={handleUpdateClose}
              isValid={isValid&&registerError==""}
            />
            {type == "Register" && (
              <div className="mt-4 text-start md:text-end flex flex-col md:flex-row justify-between">
                <LinkComponent
                  path="/login-page"
                  data="Have an account? Login"
                />
                <LinkComponent
                  path="/forget-password-page"
                  data="Forget Password"
                />
              </div>
            )}
          </div>
        </div>
      </form>
    </div>
  );
}

export default UserRegistration;
