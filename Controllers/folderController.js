const Folder = require("../models/Folder");

// CREATE A NEW FOLDER
exports.addFolder = (req, res, next) => {
  Folder.find({ name: req.body.name }, (err, folder) => {
    if (err) return next(err);
    if (folder.length) res.json("exist");
    else {
      new Folder({
        name: req.body.name,
        user: req.user,
      }).save((err, savedFolder) => {
        if (err) return next(err);
        res.json(savedFolder);
      });
    }
  });
};

// GET CURRENT USER FOLDERS
exports.f = (req, res, next) => {
  res.json("Hoal");
};
