const express = require("express");
const router = express.Router();
const asyncHandler = require("../utils/async.handler");
const {createUser,login,sendOtpCode, checkOtpCode} = require("../controller/auth.controller");
const { validator } = require("../middleware/validation/validator");
const {signupSchemaValidat, loginSchemaValidat, checkEmailSchema, verfiySchema} = require("../middleware/validation/auth.validat");

router.post("/signup",validator(signupSchemaValidat),asyncHandler(createUser));
router.post("/login", validator(loginSchemaValidat), asyncHandler(login));
router.post("/send-otp-code", validator(checkEmailSchema),asyncHandler(sendOtpCode));
router.post("/verify", validator(verfiySchema),asyncHandler(checkOtpCode));

module.exports = router;


