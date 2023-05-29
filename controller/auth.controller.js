const createError = require("http-errors");
const User = require("../model/user.model");

const createUser = async (req, res, next) => {
  const {
    firstname,
    lastname,
    username,
    password,
    email,
    phonenumber,
    gender = "not-set",
  } = req.body;

  const usernameExists = await User.exists({ username });
  if (!!usernameExists) {
    return next(createError(409, "username exists. please chenge and try again"));
  }

  const phonenumberExists = await User.exists({ phonenumber });
  if (!!phonenumberExists) {
    return next(createError(409, "phonenumber exists. please chenge and try again"));
  }

  const emailExists = await User.exists({ email });
  if (!!emailExists) {
    return next(createError(409, "email exists. please chenge and try again"));
  }

  const createUser = await User.create({
    firstname,
    lastname,
    username,
    password,
    email,
    phonenumber,
    gender,
  });

  delete createUser._doc.password;
  res.status(201).json({
    statusCode: 201,
    status: "success",
    data: createUser,
  });
};

const login = async (req, res, next) => {
  const { username, password } = req.body;
  const findUser = await User.findOne({ username });
  if (!findUser) {
    return next(createError(400, "username or password is wrong."));
  }

  const passwordIsMatch = await findUser.comparePassword(password);
  if (!passwordIsMatch) {
    return next(createError(400, "username or password is wrong."));
  }
  delete findUser._doc.password;
  res.status(200).json({
    statusCode: 200,
    status: "success",
    data: findUser,
  })
};

module.exports = { createUser, login };
