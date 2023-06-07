const User = require("../model/user.model");
const createError = require('http-errors');


const updateUser = async (req, res, next) => {
  const { id: userId } = req.params;
  const { firstname = null, lastname = null, username = null, gender = null, email= null } = req.body;
  
  const findUser = await User.findById(userId)
  if(!findUser){
    return next(createError(404,`user: ${userId} not found`))
  }

  const duplicateUsername = await User.findOne({username});
  if (!!duplicateUsername  && duplicateUsername.username !== findUser.username){
    return next(createError(400,'username is exsist'))
  }

  const duplicateEmail = await User.findOne({email});
  if (!!duplicateEmail  && duplicateEmail.email !== findUser.email){
    return next(createError(400,'username is exsist'))
  }

  findUser.firstname = firstname ?? findUser.firstname;
  findUser.lastname = lastname ?? findUser.lastname;
  findUser.username = username ?? findUser.username;
  findUser.email = email ?? findUser.email;
  findUser.gender = gender ?? findUser.gender;

  const result = await findUser.save({ validateBeforeSave: false })

  res.status(200).json({
    statusCode: 200,
    status: "success",
    data: result,
  });
};

const deleteUser = async(req, res, next ) => {
  const { id: userId } = req.params;

  const findUser = await User.findByIdAndDelete(userId)
  if (!findUser) {
		return next(createError(404, `user: ${userId} not found`));
	}

  res.status(200).json({
    statusCode: 200,
    status: "success",
  });
}

const getUser = async(req, res, next ) => {
  const { id: userId } = req.params;

  const findUser = await User.findById(userId)
  if (!findUser) {
		return next(createError(404, `user: ${userId} not found`));
	}

  res.status(200).json({
    statusCode: 200,
    status: "success",
    data:findUser
  });
}

module.exports = { updateUser, deleteUser , getUser};
