const express = require("express");
const router = express.Router();
const asyncHandler = require("../utils/async.handler");
const {createUser,login,sendEmail, chengePassword, loginOut} = require("../controller/auth.controller");
const { validator } = require("../middleware/validation/validator");
const {signupSchemaValidat, loginSchemaValidat, checkEmailSchema, passworSchema} = require("../middleware/validation/auth.validat");

router.post("/signup",validator(signupSchemaValidat),asyncHandler(createUser));
router.post("/login", validator(loginSchemaValidat), asyncHandler(login));
router.post("/send-otp-code", validator(checkEmailSchema),asyncHandler(sendEmail));
router.post("/verify", validator(passworSchema),asyncHandler(chengePassword));
router.post("/logout",asyncHandler(loginOut));

module.exports = router;


