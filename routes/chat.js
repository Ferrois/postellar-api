const express = require("express");

const router = express.Router();

const ChatSchema = require("../models/Chat.js");
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

router.post("/", authenticateToken, async (req, res) => {
  const chat = new ChatSchema({
    username: req.user,
    content: req.body.content,
  });
  try {
    const savedChat = await chat.save();
    res.json(savedChat);
  } catch (err) {
    res.json({ message: err });
  }
});

router.get("/", authenticateToken, async (req,res) => {
    const chats = await ChatSchema.find().limit(100);
    res.json(chats);
})

module.exports = router;
