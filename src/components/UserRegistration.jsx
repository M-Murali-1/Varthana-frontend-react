import React, { useState } from "react";
import InputFieldComponent from "./InputFieldComponent";
import { useReducer, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import LinkComponent from "./LinkComponent";
import { updateEmployee, addNewEmployee } from "../features/employeeSlice";
import SelectingRoleComponent from "./selectingRoleComponent";
import UserRegistrationButtons from "./UserRegistrationButtons";
import PersonIcon from "@mui/icons-material/Person";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import EmailIcon from "@mui/icons-material/Email";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import {
  confirmPasswordValidation,
  emailValidation,
  nameValidation,
  passwordValidation,
  phoneNumberValidation,
  userNameValidation,
} from "../utils/validations";
import axios from "axios";
let initialState = {
  name: "",
  username: "",
  phone_number: "",
  email_id: "",
  password: "",
  confirm_password: "",
  Role: "",
  address: {
    doorno: "",
    street: "",
    city: "",
  },
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
    case "handleDoorNoChange":
      return {
        ...state,
        address: { ...state.address, doorno: action.payload.doorno },
      };
    case "handleStreetChange":
      return {
        ...state,
        address: { ...state.address, street: action.payload.street },
      };
    case "handleCityChange":
      return {
        ...state,
        address: { ...state.address, city: action.payload.city },
      };

    case "reset":
      return initialState;
  }
};

function UserRegistration({ data = {}, type, handleClose = () => {} }) {
  const initialError = { type: "", message: "" };
  const [registerError, setRegisterError] = useState(initialError);
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
  const dispatchEmployee = useDispatch();
  console.log("the details while updating are  :", data);
  useEffect(() => {
    if (registerError.type !== "") {
      setRegisterError(initialError);
    }
  }, [details]);

  const isValid =
    !nameValidation(details.name) &&
    !userNameValidation(details.username) &&
    !phoneNumberValidation(details.phone_number) &&
    !emailValidation(details.email_id) &&
    details.Role !== "" &&
    (type === "Update Details" ||
      (!passwordValidation(details.password) &&
        !confirmPasswordValidation(
          details.confirm_password,
          details.password
        ))) &&
    registerError?.type === "";
  console.log("the form is valid :", isValid);

  console.log(details);
  const navigate = useNavigate();
  function handleUpdateClose() {
    handleClose();
    dispatch({ type: "reset" });
  }
  function handleRegister(e) {
    e.preventDefault();
    const postEmployee = async () => {
      try {
        if (type == "Register") {
          let response = await axios.post(
            `${import.meta.env.VITE_BASE_URL}${
              import.meta.env.VITE_REGISTER_URL
            }`,
            details
          );
          let token = response.data.token;
          sessionStorage.setItem("token", token);
          navigate("/login-page");
        } else if (type == "Update Details") {
          const token = sessionStorage.getItem("token");
          let response = await axios.patch(
            `${import.meta.env.VITE_BASE_URL}${
              import.meta.env.VITE_UPDATE_URL
            }/${data.id}`,
            details,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          handleClose();
          dispatchEmployee(updateEmployee({ ...details, id: data.id }));
        } else if (type == "Add New Employee") {
          const token = sessionStorage.getItem("token");

          let response = await axios.post(
            `${import.meta.env.VITE_BASE_URL}${
              import.meta.env.VITE_CREATE_URL
            }`,
            details,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          handleClose();
          dispatchEmployee(addNewEmployee(response.data.newEmployee));
        }
      } catch (err) {
        if (!err?.response) {
          setRegisterError({
            message: "Network Error..!",
            error: "No Internet conectivity..!",
          });
        } else {
          setRegisterError(err.response?.data || "Failed to fetch employees");
        }
      }
    };
    postEmployee();
  }
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
      icon: <PersonIcon />,
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
      error:
        userNameValidation(details.username) ||
        (registerError.type == "usernameError" && registerError.message),
      icon: <AccountCircleIcon />,
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
      icon: <LocalPhoneIcon />,
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
      icon: <EmailIcon />,
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
  let addressInput = [
    {
      id: "doorno",
      title: "Door No",
      type: "text",
      placeholder: "Enter your door no",
      handleChange: (e) =>
        dispatch({
          type: "handleDoorNoChange",
          payload: { doorno: e.target.value },
        }),
      value: details.address.doorno,
      required: false,
      icon: <PersonIcon />,
    },
    {
      id: "street",
      title: "Street",
      type: "text",
      placeholder: "Enter your Street",
      handleChange: (e) =>
        dispatch({
          type: "handleStreetChange",
          payload: { street: e.target.value },
        }),
      value: details.address.street,
      required: false,
      icon: <AccountCircleIcon />,
    },
    {
      id: "city",
      title: "City",
      type: "text",
      placeholder: "Enter your City",
      handleChange: (e) =>
        dispatch({
          type: "handleCityChange",
          payload: { city: e.target.value },
        }),
      value: details.address.city,
      required: false,
      icon: <LocalPhoneIcon />,
    },
  ];

  // {
  //   id: "address",
  //   title: "Add Address",
  //   placeholder: "Add Address",
  //   handleChange: (e) =>
  //     dispatch({
  //       type: "handleAddressChange",
  //       payload: { address: e.target.value },
  //     }),
  //   value: details.address,
  // };

  // if (type == "Update Details") {
  //   inputFieldsData2[0] = inputFieldsData1.pop();
  // }

  return (
    <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-lg md:max-w-3xl">
      <h2 className="text-center text-2xl font-bold mb-6">{type}</h2>
      <form onSubmit={handleRegister}>
        <div className="flex gap-0 md:gap-10 flex-col md:flex-row">
          {/* Field for name,username,phone number,email */}
          <div className="w-full md:w-1/2">
            {inputFieldsData1.map((element) => (
              <InputFieldComponent key={element.title} data={element} />
            ))}
          </div>

          {/* Field for password and confirm password */}
          <div className="w-full md:w-1/2">
            {type != "Update Details" &&
              inputFieldsData2.map((element) => (
                <InputFieldComponent key={element.title} data={element} />
              ))}
            {type == "Update Details" &&
              addressInput.map((element) => (
                <InputFieldComponent key={element.title} data={element} />
              ))}

            {/* Field for selecting the role */}
            <SelectingRoleComponent type={type} data={selectingRoleInput} />

            {/* Button for submitting the form */}
            {registerError.message === "Network Error..!" && (
              <p className="text-end text-sm text-red-600">
                {registerError.error}
              </p>
            )}

            <UserRegistrationButtons
              type={type}
              handleUpdateClose={handleUpdateClose}
              isValid={isValid}
            />
            {type == "Register" && (
              <div className="mt-4 text-start md:text-end flex flex-col md:flex-row justify-between">
                <LinkComponent
                  path="/login-page"
                  data="Have an account? Login"
                />
                <LinkComponent
                  path="/forget-password-page"
                  data="Forgot Password"
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
