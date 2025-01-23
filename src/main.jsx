import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store/store.js";
import "./index.css";
import App from "./App.jsx";
import dotenv from "dotenv";
dotenv.config();
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App />
        {/* <MaterialUiComponents /> */}
        {/* <BasicTable/> */}
      </Provider>
    </BrowserRouter>
  </StrictMode>
);
