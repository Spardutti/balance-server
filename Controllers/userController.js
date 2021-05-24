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
  res.redirect("http://localhost:3000/");
};

//GENERATE TOKEN
exports.jwtoken = (req, res, next) => {
  if (req.user) {
    const token = jwt.sign(req.user.toJSON(), process.env.JWT_SECRET, {
      expiresIn: "60m",
    });
    res.redirect("http://localhost:3000/#/logged?token=" + token);
  } else {
    res.json("no token");
  }
};

// GET CURRENT USER
exports.currentUser = (req, res, next) => {
  User.findById(req.params.id, (err, user) => {
    if (err) return next(err);
    res.json(user);
  });
};
