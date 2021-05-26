const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ItemSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User" },
  year: { type: String, default: new Date().getFullYear() },
  month: {
    type: String,
    default: new Date().toLocaleString("default", { month: "long" }),
  },
  day: { type: String, default: new Date().getDay() },
  name: String,
  price: Number,
  folder: [],
});

module.exports = mongoose.model("Item", ItemSchema);
