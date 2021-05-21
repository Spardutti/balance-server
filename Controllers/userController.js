const User = require("../models/User");
const jwt = require("jsonwebtoken");
const passport = require("passport");
require("dotenv").config();

//GOOGLE LOGIN
exports.googleLogin = (req, res, next) => {
  passport.authenticate("google", { scope: ["profile"], session: false })(
    req,
    res,
    next
  );
};

//GOOGLE CALLBACK REDIRECT
exports.googleRedirect = (req, res, next) => {
  passport.authenticate("google", {
    failureRedirect: "/login",
    successRedirect: "/token",
  })(req, res, next);
};

//LOGOUT
exports.logout = (req, res, next) => {
  req.logout();
  res.redirect("/");
};

//GENERATE TOKEN
exports.jwtoken = (req, res, next) => {
  if (req.user) {
    const token = jwt.sign(req.user.toJSON(), process.env.JWT_SECRET, {
      expiresIn: "60m",
    });
    res.json(token);
  } else {
    res.redirect("/login");
  }
};
