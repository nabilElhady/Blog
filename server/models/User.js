const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  userName: {
    type: String,
    min: 5,
  },
  email: {
    type: String,

    unique: true,
  },
  password: {
    type: String,
  },
});
const User = mongoose.model("User", userSchema);
module.exports = User;
