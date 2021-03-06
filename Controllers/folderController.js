const Folder = require("../models/Folder");
const Item = require("../models/Item");

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
exports.getFolders = (req, res, next) => {
  Folder.find({ user: req.user }, (err, folders) => {
    if (err) return next(err);
    res.json(folders);
  });
};

// GET ITEMS FROM SPECIFIC FOLDER
exports.folderItems = (req, res, next) => {
  Item.find({
    $and: [
      {
        folder: req.params.id,
        year: req.params.year,
        month: req.params.month,
      },
    ],
  })
    .populate("folder")
    .exec((err, results) => {
      if (err) return next(err);
      res.json(results);
    });
};

//CHECK IF FODLER IS EMPTY BEFORE DELETING
exports.itemByFolder = (req, res, next) => {
  Item.find({ folder: req.params.folder }, (err, items) => {
    if (err) return next(err);
    res.json(items);
  });
};

// DELETE FOLDER
exports.deleteFolder = (req, res, next) => {
  Folder.findByIdAndRemove(req.params.id, (err, folder) => {
    if (err) res.json(err);
    res.json("deleted");
  });
};
