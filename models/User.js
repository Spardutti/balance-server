const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: String,
  googleId: String,
  item: [],
});

module.exports = mongoose.model("User", UserSchema);
