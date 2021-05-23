var express = require("express");
var router = express.Router();
const userContoller = require("../Controllers/userController");
const itemController = require("../Controllers/itemController");
const passport = require("passport");

const jwtProtected = passport.authenticate("jwt", { session: false });

/* GET home page. */
router.get("/", function (req, res, next) {
  res.json(req.user);
});

// GOOGLE LOGIN
router.get("/google/login", userContoller.googleLogin);

// GOOGLE REDIRECT
router.get("/users/success", userContoller.googleRedirect);

// LOGOUT
router.get("/logout", userContoller.logout);

// TOKEN GENERATOR
router.get("/token", userContoller.jwtoken);

/***************************** ITEM ROUTES */

// ADD ITEMS TO CURRENT USER
router.post("/add/:id", jwtProtected, itemController.newItem);

//GET CURRENT USER ITEMS
router.get("/get/:id", jwtProtected, itemController.getItems);

module.exports = router;
