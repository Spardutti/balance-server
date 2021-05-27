const Item = require("../models/Item");
const User = require("../models/User");

//CREATE ITEM
exports.newItem = (req, res, next) => {
  new Item({
    name: req.body.name,
    price: req.body.price,
    user: req.user,
    folder: req.body.folder,
    year: Year,
  }).save((err, savedItem) => {
    if (err) return next(err);
    res.json(savedItem);
  });
};

//CURRENT USER ITEMS
exports.getItems = (req, res, next) => {
  Item.find({ user: req.user }, (err, result) => {
    if (err) return next(err);
    res.json(result);
  });
};

//CREATE ITEM FOLDER
exports.addFolder = (req, res, next) => {
  User.findById(req.params.id, (err, user) => {
    if (err || !user) return next(err);
    user.item.push(req.body.folderName);
    res.json(user);
  });
};

//FIND ITEMS BY MONTH AND YEAR
exports.filterItems = (req, res, next) => {
  Item.find(
    {
      $and: [
        { month: req.body.month, year: req.body.year, price: req.body.price },
      ],
    },
    (err, result) => {
      res.json(result);
    }
  );
};
