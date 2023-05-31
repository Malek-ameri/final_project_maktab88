const email = document.getElementById("email");
const sendBtn = document.getElementById("send-but");
const error = document.getElementById("err");



sendBtn.addEventListener("click", async () => {
  error.innerText = "";

  const [emailFlag, emailMessage] = Validation(email.value);
  if (!emailFlag) return error.innerText = emailMessage;

  const newData = {
    email: email.value,
  };

  const response = await fetch('http://localhost:3000/auth/send-otp-code',{
    method: 'POST',
    headers:{
      'Content-Type': 'application/json'
    },
    body:JSON.stringify(newData)
  })
  const data = await response.json()

  if(data.status === 400){
    return  error.innerText = data.message;
  }

  if(data.statusCode === 201 ){
    location.href = 'http://localhost:3000/verfiy'
  }

});

const Validation = (email) => {
  error.innerText = "";
  if (!email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g))
    return [false, "please inter valid email"];
  return [true, "ok"];
}