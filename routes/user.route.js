const express = require("express");
const router = express.Router();
const { updateUser,deleteUser,getUser } = require("../controller/user.controller");
const asyncHandler = require("../utils/async.handler");
const { validator } = require("../middleware/validation/validator");
const {updateUserSchemaValidate} = require('../middleware/validation/user.validate');



router.get("/:id", asyncHandler(getUser));
router.patch("/:id",validator(updateUserSchemaValidate), asyncHandler(updateUser));
router.delete("/:id", asyncHandler(deleteUser));

module.exports = router;
