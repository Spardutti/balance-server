const User = require("../models/User");
const jwt = require("jsonwebtoken");
const passport = require("passport");
require("dotenv").config();

//GOOGLE LOGIN
exports.googleLogin = (req, res, next) => {
  passport.authenticate("google", { scope: ["profile"] })(req, res, next);
};

//GOOGLE CALLBACK REDIRECT
//TODO Close but not finish the function
exports.googleRedirect = (req, res, next) => {
  passport.authenticate("google", (req, res, next) => {
    console.log("here");
    res.send("hola");
  });
};

//LOGOUT
exports.logout = (req, res, next) => {
  req.logout();
  res.redirect("/");
};
