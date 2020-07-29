const express = require("express");
const router = express.Router();
const User = require("../models/User");
const checkJWT = require("../middleware/checkJWT")
const { validator, userForPut } = require("../middleware/validator");


router.get("/", async (req, res) => {
  try {
    const user = await User.findAll();
    res.status(200).json(user);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findOne({ where: { id } });
    res.status(200).json(user);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put("/:id", checkJWT, validator(userForPut, "body"), async (req, res) => {
  const { id } = req.params;
  const {
    lastName,
    firstName,
    email,
    password,
    github,
    linkedin,
  } = req.body;
  try {
    await User.update(
      {
        lastName,
        firstName,
        email,
        password,
        github,
        linkedin,
      },
      { where: { id } }
    );
    const user = await User.findByPk(id);
    res.status(202).json(user);
  } catch (err) {
    res.status(422).json(err);
  }
});

router.delete("/:id", checkJWT, async (req, res) => {
  try {
    const { id } = req.params;
    await User.destroy({
      where: { id },
    });
    res.status(204).json({ message: "User is deleted." });
  } catch (err) {
    res.status(422).json(err);
  }
});

module.exports = router;
