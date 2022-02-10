const mongoose = require("mongoose");

const ChatSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    minLength: 1,
    required: true
  },
});

module.exports = mongoose.model("chat", ChatSchema);