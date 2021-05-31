const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const FolderSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User" },
  name: String,
});

module.exports = mongoose.model("Folder", FolderSchema);
