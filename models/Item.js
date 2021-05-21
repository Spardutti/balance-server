const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ItemSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User" },
  date: { type: Date, default: new Date(Date.now()) },
  name: String,
  price: Number,
});

module.exports = mongoose.model("Item", ItemSchema);
