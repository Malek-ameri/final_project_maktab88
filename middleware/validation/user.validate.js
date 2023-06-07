const joi = require('joi');

const updateUserSchemaValidate = joi.object({
  firstname: joi.string().alphanum().min(3).max(30).trim(),
  lastname: joi.string().alphanum().min(3).max(30).trim(),
  username: joi.string().min(3).max(30).lowercase().trim(),
  email: joi.string().email().lowercase().trim(),
  gender: joi.string().trim().valid("male", "female"),
});

module.exports = {
    updateUserSchemaValidate
}