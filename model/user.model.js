const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt");

const UserSchema = Schema({
  firstname: {
    type: String,
    required: [true, "firstname is required"],
    minlength: [3, "firstname must be equal or more than 3 characters"],
    maxlength: [30, "firstname must be equal or less than 30 characters"],
    trim: true,
  },
  lastname: {
    type: String,
    required: [true, "lastname is required"],
    minlength: [3, "lastname must be equal or more than 3 characters"],
    maxlength: [30, "lastname must be equal or less than 30 characters"],
    trim: true,
  },
  username: {
    type: String,
    required: [true, "username is required"],
    minlength: [3, "username must be equal or more than 3 characters"],
    maxlength: [30, "username must be equal or less than 30 characters"],
    trim: true,
    unique: true,
  },
  password: {
    type: String,
    required:[true, "password is required"],
    validate: {
      validator: (value) => {
        return value.match(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/g);
      },
      message:
        "The password must have at least 8 characters and at least one letter and one number",
    },
  },
  phonenumber: {
    type: String,
    required:[true, "phonenumber is required"],
    validate: {
      validator: (value) => {
        return value.match(/^(\+98|0)9\d{9}/g);
      },
      message:
        "Your phonenumber is invalid. Please inter valid Iran phonenumber",
    },
    set: (value) => {
      if (value.startsWith("0")) {
        return `+98${value.slice(1)}`;
      }
      return value;
    },
  },
  email:{
    type:String,
    unique:true,
    required:[true, "email is required"],
    validate:{
      validator: (value) => {
        return value.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g)
      },
      message:
        "Your email is invalid. Please inter valid email",
    }
  },
  gender: {
    type: String,
    lowercase: true,
    enum: ["male", "female", "not-set"],
    default: "not-set",
  },
  role: {
    type: String,
    lowercase: true,
    enum: ["admin", "blogger"],
    default: "blogger",
  },
  otp:{
    type:Object,
    default:{
      code:0,
      expiresIn:0
    }
  }
}, { timestamps: true });

UserSchema.pre('save', async function (next) {
	if (!this.isModified('password')) return next();

	this.password = await bcrypt.hash(this.password, 10);

	next();
});

UserSchema.methods.comparePassword = async function (userPassword) {
	return await bcrypt.compare(userPassword, this.password);
};


module.exports = model("User", UserSchema);
