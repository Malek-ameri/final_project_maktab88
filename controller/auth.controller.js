const { promisify } = require("node:util");

const jwt = require("jsonwebtoken");

const createError = require("http-errors");
const User = require("../model/user.model");
const mailer = require("../utils/send.email");
const redisClient = require("../database/redis.config");

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

  const accessToken = await promisify(jwt.sign)(
    { id: createUser._id },
    process.env.ACCESS_TOKEN,
    { expiresIn: process.env.EXPIRESIN_ACCESS_TOKEN }
  );
  const refreshToken = await promisify(jwt.sign)(
    { id: createUser._id },
    process.env.REFRESH_TOKEN,
    { expiresIn: process.env.EXPIRESIN_REFRESH_TOKEN }
  );

  const userId = createUser._id.toString();
  await redisClient.SETEX(
    userId,
    +process.env.EXPIRES_DATA_IN_REDIS,
    refreshToken
  );

  delete createUser._doc.password;
  delete createUser._doc.otp;

  res.status(201).json({
    statusCode: 201,
    status: "success",
    data: createUser,
    accessToken,
    refreshToken,
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
  delete findUser._doc.otp;

  const accessToken = await promisify(jwt.sign)(
    { id: findUser._id },
    process.env.ACCESS_TOKEN,
    { expiresIn: process.env.EXPIRESIN_ACCESS_TOKEN }
  );
  const refreshToken = await promisify(jwt.sign)(
    { id: findUser._id },
    process.env.REFRESH_TOKEN,
    { expiresIn: process.env.EXPIRESIN_REFRESH_TOKEN }
  );

  const userId = findUser._id.toString();
  await redisClient.SETEX(
    userId,
    +process.env.EXPIRES_DATA_IN_REDIS,
    refreshToken
  );

  res.status(200).json({
    statusCode: 200,
    status: "success",
    data: findUser,
    accessToken,
    refreshToken,
  });
};

const sendEmail = async (req, res, next) => {
  const { email } = req.body;

  const emailExists = await User.findOne({ email });
  if (!emailExists) {
    return next(createError(400, "This email does not exist"));
  }

  const otpCode = (Math.floor(Math.random() * 90000) + 10000).toString();
  emailExists.otp = { code: otpCode, expiresIn: new Date().getTime() + 120000 };
  await emailExists.save({ validateBeforeSave: false });

  // try {
  //   await mailer(email, otpCode);
  // } catch (error) {
  //   return next(
  //     createError(500, "we cont send opt code.Try again in a few minutes")
  //   );
  // }

  res.status(200).json({
    statusCode: 201,
    status: "success",
    message: "sent email",
  });
};

const chengePassword = async (req, res, next) => {
  const { password } = req.body;
  const {email = '',otpCode = ''} = req.query

  const findUser = await User.findOne({ email });
  if(!findUser){
    return next(createError(400,'link incorrect'));
  }
  
  if( findUser.otp.code !== otpCode){
    return next(createError(400, 'link is not correct'));
  }

  const now = new Date().getTime()
  if( now > findUser.otp.expiresIn){
    return next(createError(400, 'link has expired'))
  }

  findUser.password = password;
  await findUser.save();

  res.status(200).json({
    statusCode: 200,
    status: "success",
    message:'password cheneged'
  });

};

const loginOut = async (req, res, next) => {

  const {id} = req.body
  const findUser = await User.findById(id)

  if (!findUser) {
    return next(createError(400, "id not exists"));
  }

  const userId = findUser._id.toString();
  await redisClient.SETEX(
    userId,
    +process.env.EXPIRES_DATA_IN_REDIS,
    "null"
  );

  res.status(200).json({
    statusCode: 200,
    status: "success",
    data: 'user logout',
  });
};

module.exports = { createUser, login, sendEmail, chengePassword, loginOut };
