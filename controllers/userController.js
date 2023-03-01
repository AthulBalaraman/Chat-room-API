const mongoose = require("mongoose");
const UserModel = require("../models/User");
const sha256 = require("js-sha256");
const {createTokens} = require('../middlewares/JWT')


exports.register = async (req, res) => {
  const { name, email, password } = req.body;
  const emailRegex = /@gmail.com|@yahoo.com|@hotmail.com|@live.com/;
  if (!emailRegex.test(email)) throw "Email is not supported from your domain";
  if (password.length < 6) {
    throw "Password should atleast be 6 characters long";
  }

  const userExists = await UserModel.findOne({
    email:email
  });
  if(userExists) throw "User with the same email exists."

  const user = new UserModel({
    name,
    email,
    password: sha256(password + process.env.SALT),
  });
  await user.save();

  res.json({
    user: name,
    message: "User registered successfully",
  });
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  const user = await UserModel.findOne({
    email,
    password: sha256(password + process.env.SALT),
  });
  if(!user) throw "Email and Password did not match."

  const accessToken = createTokens(user)

  res.cookie("access-token", accessToken,{
    maxAge:60*60*24*30*1000,
    httpOnly:true
  })

  res.json({
    message:"User logged in successfully!",
    accessToken
  })
};
