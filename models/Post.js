const mongoose = require("mongoose");

const PostSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
    minLength: [5, "Please use a longer title"],
    maxLength: [40, "Please shorten your title to under 40 characters"],
  },
  description: {
    type: String,
    required: true,
    minLength: [20, "Please submit a longer content"],
    maxLength: [4000, "Please shorten your content to under 4000 characters"],
  },
});

module.exports = mongoose.model("posts", PostSchema);