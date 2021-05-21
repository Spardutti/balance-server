const Item = require("../models/Item");
const User = require("../models/User");

//CREATE ITEM
exports.addItem = (req, res, next) => {
  User.findById(req.params.id, (err, user) => {
    if (err) return next(err);
    if (user) {
      const item = new Item({
        name: req.body.name,
        price: req.body.price,
      });
      let day = item.date.getDay();
      let month = item.date.getMonth();
      let year = item.date.getFullYear();
      //CHECK FOR YEAR ARRAY
      if (user.item.indexOf(year) === -1) {
        user.item.push([year]);
      }
      //CHECK FOR MONTH ARRAY
      res.json({ user });
    }
  });
};
