const mongoose = require("mongoose");

const LoginSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    minLength: [5, "Please have atleast 5 Characters in your username"],
    maxLength: [14, "Please have 14 or less Characters in your username"],
  },
  password: {
    type: String,
    required: true,
    minLength: [6, "Please have longer than 6 Characters in your password"],
    maxLength: [50, "Lol honestly would you want a password that long????"],
  },
  userId: {
    type: String,
  },
});

module.exports = mongoose.model("login", LoginSchema);
