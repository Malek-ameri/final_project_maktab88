const joi = require('joi');

const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)/;
const phoneNumberRegex = /^(\+98|0)9\d{9}/;

const signupSchemaValidat = joi.object({
    firstname:joi.string().alphanum().required().min(3).max(30).trim(),
    lastname:joi.string().alphanum().required().min(3).max(30).trim(),
    username:joi.string().required().min(3).max(30).lowercase().trim(),
    password: joi.string().required().pattern(passwordRegex).min(8).error(Error("The password must have at least 8 characters and at least one letter and one number")),
    phonenumber:joi.string().required().pattern(phoneNumberRegex).trim().error(Error('Your phonenumber is invalid. Please inter valid Iran phonenumber')),
    email:joi.string().required().email().lowercase().trim(),
    gender: joi.string().trim().valid('male','female'),
})

const loginSchemaValidat = joi.object({
    username:joi.string().required(),
    password: joi.string().required()
})


module.exports = { signupSchemaValidat, loginSchemaValidat }