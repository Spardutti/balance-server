const Item = require("../models/Item");
const User = require("../models/User");

//CREATE ITEM
exports.newItem = (req, res, next) => {
  new Item({
    name: req.body.name,
    price: req.body.price,
    user: req.user,
    folder: req.body.folder,
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

// GET ALL YEARS THAT ARE NOT EMPTY
exports.getYears = (req, res, next) => {
  let years = [];
  Item.find({ user: req.user }, (err, items) => {
    if (err) return next(err);
    items.forEach((item) => {
      if (years.indexOf(item.year) === -1) {
        years.push(item.year);
      }
    });
    res.json(years);
  });
};

// GET ITEMS FROM THE SPECIFIED YEAR AND MONTH
exports.getItemsByMonthYear = (req, res, next) => {
  Item.find(
    {
      $and: [{ user: req.user, year: req.body.year, month: req.body.month }],
    },
    (err, items) => {
      if (err) return next(err);
      res.json(items);
    }
  );
};
