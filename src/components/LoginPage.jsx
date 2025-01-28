import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import LinkComponent from "./LinkComponent";
import InputFieldComponent from "./InputFieldComponent";
import EmailIcon from "@mui/icons-material/Email";
import { useDispatch, useSelector } from "react-redux";
import { fetchEmployees } from "../features/employeeSlice";
import Snackbar from "@mui/material/Snackbar";

function LoginPage() {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const initial = { email_id: "", password: "" };
  const [loginData, setLoginData] = useState(initial);
  const dispatch = useDispatch();

  const { loading, error: fetchingError } = useSelector(
    (state) => state.employee
  );
  const [open, setOpen] = useState(false);
  const handleClose = (reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  // Logic for handling the login page submission.
  async function handleLoginPage(e) {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}${import.meta.env.VITE_LOGIN_URL}`,
        loginData
      );
      setLoginData(initial);

      // Setting the token within the sessionstorage.
      sessionStorage.setItem("token", response.data.token);

      // Function for the purpose of fetching the data and storing it inside the store.
      dispatch(fetchEmployees());
    } catch (err) {
      setError(err.response.data.message);
      setOpen(true);
    }
  }

  // Removing the error when there is an error and we changed the data in the login form.
  useEffect(() => {
    if (error !== "") {
      setError("");
    }
  }, [loginData]);

  // functional logic for storing the data from the input fields.
  const handleEmailChange = (e) => {
    setLoginData((prev) => ({ ...prev, email_id: e.target.value }));
  };
  const handlePasswordChange = (e) => {
    setLoginData((prev) => ({ ...prev, password: e.target.value }));
  };

  const handleFormChange=(action)=>{
   setLoginData((prev)=>({...prev,...action.payload}))
  }
  console.log("the data got here :",loginData);
  
  // Data required for creating the input fileds (emailid,password)
  const inputFieldsData = [
    {
      id: "email",
      title: "Email",
      type: "email",
      placeholder: "Enter your email id",
      handleChange: (event)=>handleFormChange({payload:{email_id:event.target.value}}),
      value: loginData.email_id,
      required: true,
      // error: emailValidation(loginData.email_id),
      icon: <EmailIcon />,
    },
    {
      id: "password",
      title: "Password",
      type: "password",
      placeholder: "Enter your password",
      handleChange: (event)=>handleFormChange({payload:{password:event.target.value}}),
      value: loginData.password,
      required: true,
      // error: passwordValidation(loginData.password),
    },
  ];

  // If there is an error it will activates the snackbar or else it will navigate to the home page.
  useEffect(() => {
    if (fetchingError) {
      setOpen(true);
    } else if (
      fetchingError === "" &&
      !loading &&
      sessionStorage.getItem("token")
    ) {
      navigate("/home-page");
    }
  }, [fetchingError, loading]);

  return (
    <div className="">
      <div className=" min-h-screen flex flex-col  bg-gray-100 items-center justify-center px-2 bg-gradient-to-br from-green-100 via-gray-50 to-green-200">
        <img
          src="/Varthana_Logo1.webp"
          className="rounded-full mb-5"
          alt="Varthana Logo"
        />

        <div className="bg-white p-8 rounded-lg shadow-md w-80 mb-5">
          <p className="text-center text-2xl font-bold my-3">Login</p>

          <form onSubmit={handleLoginPage}>
            {/* Generating the input field components..! */}
            {inputFieldsData.map((element) => (
              <InputFieldComponent key={element.title} data={element} />
            ))}

            {/* Displaying the Server side errors while logging..! */}
            {/* <div className="text-red-500 mb-1 text-sm text-right">
              {error && <p>{error}</p>}
            </div> */}

            <button
              type="submit"
              className="bg-[#57A649] text-white w-full py-2 mb-2 rounded-md hover:opacity-80"
            >
              Login
            </button>
          </form>
          {/* Links for Navigating to the register and forgot password page..! */}
          <LinkComponent
            path="/signup-page"
            data="Don't have an account? Sign up."
          />
          <LinkComponent path="/forget-password-page" data="Forgot Password" />
        </div>

        {(fetchingError || error) && (
          <div>
            <Snackbar
              open={open}
              autoHideDuration={5000}
              onClose={handleClose}
              message={fetchingError ? fetchingError : error}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default LoginPage;
