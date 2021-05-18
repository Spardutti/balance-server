const User = require("../models/User");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const { session } = require("passport");
require("dotenv").config();

//GOOGLE LOGIN
exports.googleLogin = (req, res, next) => {
  passport.authenticate("google", { scope: ["profile"] })(req, res, next);
};

//GOOGLE CALLBACK REDIRECT
exports.googleRedirect = (req, res, next) => {
  passport.authenticate("google", (err, user) => {
    if (err) return next(err);
    if (user) {
      res.redirect("/");
    }
  })(req, res, next);
};

//LOGOUT
exports.logout = (req, res, next) => {
  req.logout();
  res.redirect("/");
};
