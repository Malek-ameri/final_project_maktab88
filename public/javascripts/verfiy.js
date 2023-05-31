const email = document.getElementById("email");
const optCode = document.getElementById("code");
const sendBtn = document.getElementById("send-but");
const error = document.getElementById("err");

sendBtn.addEventListener("click", async () => {
  error.innerText = "";

  const [flag, message] = Validation(email.value, optCode.value);
  if (!flag) return (error.innerText = message);

  const newData = {
    email: email.value,
    otpCode:optCode.value
  };

  const response = await fetch("http://localhost:3000/auth/verify", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newData),
  });
  const data = await response.json();
  console.log(data);

  if (data.status === 400) {
    return (error.innerText = data.message);
  }

  if (data.statusCode === 201) {
    location.href = "http://localhost:3000/";
  }
});

const Validation = (email,code ) => {
  error.innerText = "";
  if (!email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g)) return [false, "please inter valid email"];
  if (!code.match(/\b\d{5}\b/g)) return [false, "please inter valid code"];

  return [true, "ok"];
};

