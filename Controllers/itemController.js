const Item = require("../models/Item");
const User = require("../models/User");

//CREATE ITEM
exports.newItem = (req, res, next) => {
  new Item({
    name: req.body.name,
    price: req.body.price,
    user: req.user,
    folder: req.body.folder,
    day: req.body.day,
    month: req.body.month,
    year: req.body.year,
  }).save((err, savedItem) => {
    if (err) return next(err);
    res.json(savedItem);
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
exports.getCurrentMonthYearData = (req, res, next) => {
  let year = req.params.year;
  let month = req.params.month;
  Item.find({
    $and: [{ user: req.user, year, month }],
  })
    .populate("folder")
    .sort({ day: -1 })
    .exec((err, items) => {
      if (err) return next(err);
      res.json(items);
    });
};

//GET ALL THE MONTHS THAT BELONG TO THE YEAR
exports.getCurrentYearMonths = (req, res, next) => {
  let year = req.params.year;
  let months = [];
  Item.find({ $and: [{ user: req.user, year }] }, (err, items) => {
    if (err) return next(err);
    items.forEach((item) => {
      if (months.indexOf(item.month) === -1) {
        months.push(item.month);
      }
    });
    res.json(months);
  });
};

// DELETE SPECIFIC ITEM
exports.deleteItem = (req, res, next) => {
  Item.findByIdAndRemove(req.params.id, (err, item) => {
    if (err) return next(err);
    res.json("deleted");
  });
};

// EDIT ITEM
exports.editItem = (req, res, next) => {
  Item.findById(req.params.id, (err, item) => {
    if (err) return next(err);
    if (item) {
      (item.name = req.body.name), (item.price = req.body.price);
    }
    item.save((err) => {
      if (err) return next(err);
      res.json(item);
    });
  });
};
