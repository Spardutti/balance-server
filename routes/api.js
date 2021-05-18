var express = require("express");
var router = express.Router();
const userContoller = require("../Controllers/userController");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.json(req.user);
});

// GOOGLE LOGIN
router.get("/users/login", userContoller.googleLogin);

//GOOGLE REDIRECT
router.get("/users/success", userContoller.googleRedirect);

//LOGUT
router.get("/users/logout", userContoller.logout);

module.exports = router;
