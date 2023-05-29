const createError = require("http-errors");
const User = require("../model/user.model");
const Otp = require("../model/otp.model");
const sendEmail = require("../utils/send.email");

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
    return next(
      createError(409, "username exists. please chenge and try again")
    );
  }

  const phonenumberExists = await User.exists({ phonenumber });
  if (!!phonenumberExists) {
    return next(
      createError(409, "phonenumber exists. please chenge and try again")
    );
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
  });
};

const sendOtpCode = async (req, res, next) => {
  const { email } = req.body;

  const emailExists = await User.exists({ email });
  if (!emailExists) {
    return next(createError(400, "This email does not exist"));
  }

  const otpCode = (Math.floor(Math.random() * 90000) + 10000).toString();

  try {
    await sendEmail(email, otpCode);
  } catch (error) {
    return next(
      createError(500, "we cont send opt code.Try again in a few minutes")
    );
  }

  await Otp.create({ email, otpCode });

  res.status(200).json({
    statusCode:201,
    status:'success',
    message:'otp code sent'
  });
};

module.exports = { createUser, login, sendOtpCode };
