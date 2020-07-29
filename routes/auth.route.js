const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { SECRET } = process.env;

const router = express.Router();

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({
      where: {
        email,
      },
    });

    const isPasswordValid = user.validPassword(password);

    if (user && isPasswordValid) {
      const payload = {
        id: user.dataValues.id,
        email: user.dataValues.email,
      };
      const token = jwt.sign(payload, SECRET, {
        expiresIn: "24h",
      });
      res.status(200).json({ token, user });
    } else {
      res.status(400).json({ message: "Wrong credentials" });
    }
  } catch (err) {
    res.status(422).json({ message: "Wrong credentials", error: err.errors });
  }
});

router.post("/register", async (req, res) => {
  const { lastName, firstName, password, email, github, linkedin } = req.body;
  try {
    const register = await User.create({
      lastName,
      firstName,
      password,
      email,
      github,
      linkedin,
    });
    res.status(201).json(register);
  } catch (err) {
    res.status(422).json({ message: "Wrong credentials", error: err.errors });
  }
});

module.exports = router;
