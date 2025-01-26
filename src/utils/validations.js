// Logic for the validation of the name.
export const nameValidation = (name) => {
  if (!name) {
    return "Name is required";
  } else if (name.length < 3) {
    return "Name must be atleast 3 character long..!";
  }
};

// Logic for the validation of the email ID.
export const emailValidation = (email) => {
  if (!email) {
    return "Email is required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)) {
    return "Invalid Email ID";
  }
};

// Logic for the vaidation of the Mobile Number.
export const phoneNumberValidation = (phNumber) => {
  if (!phNumber) {
    return "Phone Number is Required";
  } else if (!/^[6-9]\d{9}$/i.test(phNumber)) {
    return "Invalid Mobile Number";
  }
};

// Logic for the validation of the password.
export const passwordValidation = (password) => {
  if (!password) {
    return "Password is Required";
  } else if (!/[A-Z]/.test(password)) {
    return "passwrod should contain atleast 1 uppercase..!";
  } else if (!/[a-z]/.test(password)) {
    return "Password should contain atleast 1 lowercase..!";
  } else if (!/\d/.test(password)) {
    return "Passwrod should contain atleast 1 digit..!";
  } else if (password.length < 6)
    return "Password Should be minimum 6 characters..!";
};

// Logic for the validation of the confirm password..!
export const confirmPasswordValidation = (password, confirmPassword) => {
  if (password !== confirmPassword) {
    return "Password is not matching..!";
  }
};

// Logic for the Username.
export const userNameValidation = (name) => {
  if (!name) {
    return "Username is required";
  } else if (name.length < 5) {
    return "Username must be atleast 5 character long..!";
  }
};
