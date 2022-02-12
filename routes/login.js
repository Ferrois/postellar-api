const express = require("express");

const router = express.Router();

const LoginSchema = require("../models/Login.js");

const jwt = require("jsonwebtoken");
// const { authenticateToken } = require("../index");
require("dotenv").config("../.env");

//verifies if username matches password
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

router.post("/", async (req, res) => {
  const user = await LoginSchema.find({ username: req.body.username });
  if (user.length === 0) {
    res.json({ type: "error", message: "Username does not exist!" });
    return;
  }
  if (req.body.password !== user[0].password) {
    res.json({ type: "error", message: "Wrong password!" });
    return;
  }
  console.log(`${req.body.username} >Logged in`);
  
  // res.json({
  //   type: "loginSuccess",
  //   message: `Logged in as ${req.body.username}!`,
  // });

  const accessToken = jwt.sign(req.body.username, process.env.ACCESS_TOKEN);
  res.json({
    accessToken: accessToken,
    type: "loginSuccess",
    message: `Logged in as ${req.body.username}!`,
  });
});

router.get("/", authenticateToken, async (req, res) => {
  res.json({ username: req.user });
  console.log(`${req.user} >Authenticated`)
});

router.get("/test",(req,res)=>{
  res.send("test success")
})

module.exports = router;
