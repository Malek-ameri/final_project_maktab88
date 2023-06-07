const nodemailer = require("nodemailer");

async function mailer(email, optCode) {

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USERNAME,
    to: email,
    subject: "Subject",
    text: optCode,
    html:`<p style="font-size: 20px;"><b>http://localhost:3000/auth/verify?email=${email}&otp=${optCode}</b></p>`
  }

  const info = await transporter.sendMail(mailOptions);

  console.log("Message sent: %s", info.messageId);
}



module.exports = mailer
