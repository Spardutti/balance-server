const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const yearSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User" },
  year: { type: Date, default: new Date().getFullYear() },
});

module.exports = mongoose.model("Year", yearSchema);
