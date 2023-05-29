const express = require('express');
const router = express.Router();
const asyncHandler = require('../utils/async.handler');
const { createUser, login, sendOtpCode } = require('../controller/auth.controller');
const { validator} = require('../middleware/validation/validator')
const {signupSchemaValidat, loginSchemaValidat} = require('../middleware/validation/auth.validat');

router.post('/signup',validator(signupSchemaValidat), asyncHandler(createUser));
router.post('/login',validator(loginSchemaValidat), asyncHandler(login));
router.post('/forget', asyncHandler(sendOtpCode));

module.exports = router;


