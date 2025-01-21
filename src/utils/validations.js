export let count = 0;
export const nameValidation=(name,handleErrors) =>{
    if(!name) {
        count++;
        return "Name is required"
    }
    if(name.length<3) {
        count++;
        return "Name must be atleast 3 character long..!"
    }
    //handleErrors();
}
export const emailValidation=(email,handleErrors)=>{
    if(!email) {
        count++;
        return "Email is required"
    }
    else if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)) {
        count++;
        return "Invalid Email ID"
    }
}
export const phoneNumberValidation=(phNumber,handleErrors)=>{
    if(!phNumber) {
        count++;
        return "Phone Number is Required";
    }
    else if(!/^[0-9]{10}$/i.test(phNumber)) {
        count++;
        return "Invalid Mobile Number"
    }
}
export const passwordValidation=(password,handleErrors)=>{
    if(!password) {
        return "Password is Required"
        count++;
    }
    else if(!/^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%])[A-Za-z0-9!@#$%]{6,}$/.test(password)) {
        return "Weak Password..!"
        count++;
    }
}
export const confirmPasswordValidation=(password,confirmPassword,handleErrors)=>{
    if(password!==confirmPassword) {
        return "Password is not matching..!"
        count++;
    }
}