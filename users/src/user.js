const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Userchema = new Schema({
  name: String
});

const User = mongoose.model("user", Userchema);

module.exports = User;
