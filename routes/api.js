var express = require("express");
var router = express.Router();
const userContoller = require("../Controllers/userController");
const itemController = require("../Controllers/itemController");
const folderController = require("../Controllers/folderController");
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

// SET FIRST VISIT TO FALSE
router.post("/user/:id", jwtProtected, userContoller.hideWelcome);

/***************************** ITEM ROUTES */

// ADD ITEMS TO CURRENT USER
router.post("/add/:id", jwtProtected, itemController.newItem);

//GET ITEMS OF CURRENT YEAR AND MONTH
router.get(
  "/items/current/:year/:month",
  jwtProtected,
  itemController.getCurrentMonthYearData
);

//GET ITEM YEARS
router.get("/items/year", jwtProtected, itemController.getYears);

// GET MONTHS FROM YEAR
router.get(
  "/items/year/:year",
  jwtProtected,
  itemController.getCurrentYearMonths
);

// REMOVE SPECIFIC ITEM
router.delete("/item/delete/:id", jwtProtected, itemController.deleteItem);

//EDIT SPECIFIC ITEM
router.put("/item/edit/:id", jwtProtected, itemController.editItem);

/************************************* FOLDER ROUTES */

// CREATE NEW FOLDER
router.post("/folder/add", jwtProtected, folderController.addFolder);

//GET CURRENT USER FOLDERS
router.get("/folders", jwtProtected, folderController.getFolders);

// GET ITEMS FROM SPECIFIC FOLDER
router.get(
  "/folder/:id/:year/:month",
  jwtProtected,
  folderController.folderItems
);

// CHECK IF FOLDER IS EMTPY
router.get("/item/folder/:folder", jwtProtected, folderController.itemByFolder);

// DELETE FOLDER
router.delete(
  "/folder/delete/:id",
  jwtProtected,
  folderController.deleteFolder
);

module.exports = router;
