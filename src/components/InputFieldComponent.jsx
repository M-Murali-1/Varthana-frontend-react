import { useState } from "react";
import { OutlinedInput } from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import IconButton from "@mui/material/IconButton";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import InputAdornment from "@mui/material/InputAdornment";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";

function InputFieldComponent({ data }) {
  // Logic for the toggling the password visiblility..!
  const [visible, setVisible] = useState(false);
  if (data.type === "password") {
    data.isPassword = true;
  }
  function handlePassword(e) {
    data.type = visible ? "password" : "text";
    setVisible(!visible);
  }

  return (
    // Logic for the creating the Single Input field component
    <div>
      <FormControl
        variant="outlined"
        fullWidth
        margin="normal"
        sx={{
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderColor: "#57A649",
            },
            "&:hover fieldset": {
              borderColor: "#57A649",
            },
            "&.Mui-focused fieldset": {
              borderColor: "#57A649",
            },
          },
        }}
      >
        <InputLabel
          htmlFor={data.id}
          error={data.error && data.value !== ""}
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
                {data?.icon || <EmailIcon />}
              </InputAdornment>
            )
          }
          endAdornment={
            data.isPassword && (
              <InputAdornment position="end">
                <IconButton onClick={handlePassword}>
                  {data.type === "password" ? (
                    <VisibilityOutlinedIcon />
                  ) : (
                    <VisibilityOffOutlinedIcon />
                  )}
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
      {data.error && data.value !== "" && (
        <p className="text-xs text-end text-red-500">{data.error}</p>
      )}
    </div>
  );
}

export default InputFieldComponent;
