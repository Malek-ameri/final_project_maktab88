const { Schema, model } = require("mongoose");


const OtpSchema = Schema({
    email:{type:String},
    otpCode:{type:String},
    createdAt: { type: Date, expires: 60, default: Date.now },
});



module.exports = model("otp", OtpSchema);
