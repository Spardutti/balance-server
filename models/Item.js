const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ItemSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User" },
  year: { type: Date, default: new Date().getFullYear() },
  month: { type: Date, default: new Date().getMonth() },
  day: { type: Date, default: new Date().getDay() },
  name: String,
  price: Number,
});

module.exports = mongoose.model("Item", ItemSchema);
