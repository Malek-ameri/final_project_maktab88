const signupBut = document.getElementById("signup-but");
const firstname = document.getElementById("first-name");
const lastname = document.getElementById("last-name");
const username = document.getElementById("user-name");
const password = document.getElementById("password");
const email = document.getElementById("email");
const phonenumber = document.getElementById("phonenumber");
const gender = document.getElementById("gender");

const fnameError = document.getElementById("fname-error");
const lnameError = document.getElementById("lname-error");
const usernameError = document.getElementById("uname-error");
const passError = document.getElementById("pass-error");
const emailError = document.getElementById("email-error");
const phoneError = document.getElementById("phone-error");
const existsError = document.getElementById("exists");


signupBut.addEventListener("click", async () => {
  
  existsError.innerText = "";

  const [fnameFlag, fnameMessage] = fnameValidation(firstname.value);
  if (!fnameFlag) fnameError.innerText = fnameMessage;

  const [lnameFlag, lnameMessage] = lnameValidation(lastname.value);
  if (!lnameFlag) lnameError.innerText = lnameMessage;

  const [usernameFlag, usernameMessage] = usernameValidation(username.value);
  if (!usernameFlag) usernameError.innerText = usernameMessage;

  const [passwordFlag, passwordMessage] = passwordValidation(password.value);
  if (!passwordFlag) passError.innerText = passwordMessage;

  const [emailFlag, emailMessage] = emailValidation(email.value);
  if (!emailFlag) emailError.innerText = emailMessage;

  const [phoneFlag, phoneMessage] = phoneValidation(phonenumber.value);
  if (!phoneFlag) phoneError.innerText = phoneMessage;

  if (!fnameFlag || !lnameFlag || !usernameFlag || !emailFlag || !passwordFlag || !phoneFlag ) return;


  const newData = {
    firstname: firstname.value,
    lastname: lastname.value,
    username: username.value,
    password: password.value,
    email: email.value,
    phonenumber: phonenumber.value,
    gender: gender.value,
  };

  const response = await fetch('http://localhost:3000/auth/signup',{
    method: 'POST',
    headers:{
      'Content-Type': 'application/json'
    },
    body:JSON.stringify(newData)
  })
  const data = await response.json()

  if(data.status === 409){
    return  existsError.innerText = data.message;
  }

  if(data.statusCode === 201 ){
    location.href = 'http://localhost:3000/'
  }
    
});
