import { useState } from "react";
import IconButton from '@mui/material/IconButton';
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import EmailIcon from "@mui/icons-material/Email";
import { OutlinedInput } from "@mui/material";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";

function InputFieldComponent({ data }) {
  // Logic for the toggling the password visiblility..!
  const [visible, setVisible] = useState(false);
  if (data.type == "password") {
    data.isPassword = true;
  }
  function handlePassword(e) {
    console.log("clikced..!", visible);
    data.type = visible ? "password" : "text";
    setVisible(!visible);
  }

  return (
    // Logic for the creating the Single Input field component
    <div className="">
      {/* <label
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
            className="absolute bottom-2 right-2 opacity-30"
            onClick={handlePassword}
          >
            {data.type == "password" && <VisibilityOutlinedIcon />}
            {data.type == "text" && <VisibilityOffOutlinedIcon />}
          </div>
        )}
      </div> */}

      
      <FormControl variant="outlined" fullWidth margin="normal">
        <InputLabel
          htmlFor={data.id}
          error={data.error && data.value != ""}
          focused={true}
          sx={{
            color: "#000000",
            "&.Mui-focused": { color: "#000000" },
            "&.Mui-error": { color: "#000000" },
          }}
        >
          {data.title}
        </InputLabel>
        <OutlinedInput
          id={data.id}
          startAdornment={
            !data.isPassword && (
              <InputAdornment position="start">
                {data?.icon||<EmailIcon />}
              </InputAdornment>
            )
          }
          endAdornment={
            data.isPassword && (
              <InputAdornment position="end">
                <IconButton  onClick={handlePassword}>
                  {data.type == "password" ?<VisibilityOutlinedIcon />:<VisibilityOffOutlinedIcon/>}
                </IconButton>
              </InputAdornment>
            )
          }
          
          label={data.title}
          error={data.error && data.value != ""}
          placeholder={data.placeholder}
          value={data.value}
          onChange={(e) => data.handleChange(e)}
          type={data.type}
        />
      </FormControl>
      {/* Handling the input validation errors for the input fields..! */}
      {data.error && data.value != "" && (
        <p className="text-xs text-end text-red-500">{data.error}</p>
      )}
    </div>
  );
}

export default InputFieldComponent;
