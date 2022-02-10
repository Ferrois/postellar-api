const express = require("express");

const router = express.Router();

const LoginSchema = require("../models/Login.js");

const { v4 } = require("uuid");

router.post("/", async (req, res) => {
  const loginInfo = new LoginSchema({
    username: req.body.username,
    password: req.body.password,
    userId: v4()
  });

  const existingUser = await LoginSchema.find({
    username: `${req.body.username}`,
  });
  console.log(existingUser);
  if (existingUser.length !== 0) {
    res.json({ type: "error", message: "This username has been taken!" });
    // res.send("This username has been taken!");
    console.log("exisitng user");
    return;
  }
  try {
    const savedLogin = await loginInfo.save();
    res.json(savedLogin);
  } catch (err) {
    res.status(400).json({ message: err });
  }
});

module.exports = router;
