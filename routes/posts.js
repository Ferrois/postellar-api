const express = require("express");

const router = express.Router();

const PostSchema = require("../models/Post.js");

const jwt = require("jsonwebtoken");

require("dotenv").config("../.env");

function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) return res.sendStatus(401);
  jwt.verify(token, process.env.ACCESS_TOKEN, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

router.get("/", async (req, res) => {
  const posts = await PostSchema.find().limit(20);
  console.log("GET >Posts");
  res.json(posts);
});

router.post("/", async (req, res) => {
    console.log(req)
  const postInfo = new PostSchema({
    username: req.body.username,
    title: req.body.title,
    description: req.body.description,
  });
  try {
    const savedInfo = await postInfo.save();
    res.json(savedInfo);
  } catch (err) {
    res.json({ message: err });
  }
//   console.log(posts);
//   res.json(posts);
});

module.exports = router;