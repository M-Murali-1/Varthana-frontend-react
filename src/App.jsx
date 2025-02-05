import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import LoginPage from "./components/LoginPage";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import ForgetPasswordPage from "./components/ForgetPasswordPage";
import SignupPage from "./components/SignupPage";
import ResetPasswordPage from "./components/ResetPasswordPage";
import HomePage from "./components/HomePage";
function App() {
  return (
    <>
    <div>
      
    </div>
      <Routes>
        <Route index element={<LoginPage />} />
         <Route path="/login-page" element={<LoginPage />} />
        <Route path="/forget-password-page" element={<ForgetPasswordPage />} />
        <Route path="/signup-page" element={<SignupPage />} />
        <Route path="/reset-password-page" element={<ResetPasswordPage/>}/>
        <Route path="/home-page" element={<HomePage/>}/>
      </Routes>
    </>
  );
}

export default App;
