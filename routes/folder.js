const folderController = require("../Controllers/folderController");

const jwtProtected = passport.authenticate("jwt", { session: false });

// CREATE NEW FOLDER
router.post("/user/folder/add", jwtProtected, folderController.addFolder);

//GET CURRENT USER FOLDERS
router.get("/user/folders", jwtProtected, folderController.f);
module.exports = router;
