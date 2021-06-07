const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: String,
  googleId: String,
  firstVisit: { type: Boolean, default: true },
});

module.exports = mongoose.model("User", UserSchema);
