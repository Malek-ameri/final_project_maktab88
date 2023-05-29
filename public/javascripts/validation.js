const passwordValidation = (password) => {
  passError.innerText = "";
  password = password ?? "";
  if (!password.match(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/g))
    return [
      false,
      " minimum eight characters, at least one letter and one number",
    ];
  return [true, "ok"];
};

const fnameValidation = (firstname) => {
  fnameError.innerText = "";
  firstname = firstname ?? "";
  if (firstname.trim() === "") return [false, "please fill out this field"];
  if (!firstname.match(/([a-zA-Z0-9)]){3,10}/g))
    return [false, "Must be more than 3 characters"];
  return [true, "ok"];
};

const lnameValidation = (lastname) => {
  lnameError.innerText = "";
  lastname = lastname ?? "";
  if (lastname.trim() === "") return [false, "please fill out this field"];
  if (!lastname.match(/([a-zA-Z0-9)]){3,10}/g))
    return [false, "Must be more than 3 characters"];
  return [true, "ok"];
};

const usernameValidation = (username) => {
  usernameError.innerText = "";
  username = username ?? "";
  if (username.trim() === "") return [false, "please fill out this field"];
  if (!username.match(/([a-zA-Z0-9)]){3,10}/g))
    return [false, "Must be more than 3 characters"];
  return [true, "ok"];
};

const emailValidation = (email) => {
  emailError.innerText = "";
  if (!email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g))
    return [false, "please inter valid email"];
  return [true, "ok"];
};

const phoneValidation = (phone) => {
  phoneError.innerText = "";
  if (!phone.match(/^(\+98|0)9\d{9}/g))
    return [false, "please inter valid phonenumber"];
  return [true, "ok"];
};
