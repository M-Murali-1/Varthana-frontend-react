import React from "react";

import Box from "@mui/material/Box";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import EmailIcon from "@mui/icons-material/Email";
import { OutlinedInput } from "@mui/material";
import TextField from "@mui/material/TextField";
function LoginPage() {
  return (
    <>
    <FormControl label="Outlined" variant="outlined" >
      <InputLabel htmlFor="email">Email:</InputLabel>
      <Input
        id="email"
        startAdornment={
          <InputAdornment position="start">
            <EmailIcon />
          </InputAdornment>
        }
      />
      const [first, setfirst] = useState("")
    </FormControl>
     <FormControl variant="outlined" fullWidth margin="normal">
     <InputLabel htmlFor="email">Email</InputLabel>
     <OutlinedInput
       id="email"
       startAdornment={
         <InputAdornment position="start">
           <EmailIcon />
         </InputAdornment>
       }
       label="Email"
     />
   </FormControl>
   </>
  );
}

export default LoginPage;
