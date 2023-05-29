const loginBut = document.getElementById("login-but");
const username = document.getElementById("user-name");
const password = document.getElementById("password");
const error = document.getElementById("err");

const Validation = (value) => {
  error.innerText = "";
  value = value ?? "";
  if (value.trim() === "") return [false];
  return [true, "ok"];
};

loginBut.addEventListener("click", async () => {
  error.innerText = "";

  const [usernameFlags] = Validation(username.value);
  const [passwordFlags] = Validation(password.value);

  if (!usernameFlags || !passwordFlags) {
    return (error.innerText = "Please fill in all the fields");
  }

  const newData = {
    username: username.value,
    password: password.value,
  };

  const response = await fetch('http://localhost:3000/auth/login',{
    method: 'POST',
    headers:{
      'Content-Type': 'application/json'
    },
    body:JSON.stringify(newData)
  })
  const data = await response.json()
  console.log(data)

  if(data.status === 400){
    return  error.innerText = data.message;
  }

  if(data.statusCode === 200 ){
    location.href = 'http://localhost:3000/'
  }

});
