var express = require("express");
var router = express.Router();
const userContoller = require("../Controllers/userController");
const itemController = require("../Controllers/itemController");
const passport = require("passport");

const jwtProtected = passport.authenticate("jwt", { session: false });

/* GET home page. */
router.get("/user/:id", jwtProtected, userContoller.currentUser);

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

//GET ITEMS OF CURRENT YEAR AND MONTH
router.get(
  "/user/items/current",
  jwtProtected,
  itemController.getItemsByMonthYear
);

//GET ITEM YEARS
router.get("/user/items/year", jwtProtected, itemController.getYears);

module.exports = router;
