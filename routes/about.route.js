const express = require("express");
const router = express.Router();
const About = require("../models/About");
const checkJWT = require("../middleware/checkJWT")
const { validator, aboutForPut } = require("../middleware/validator");


router.get("/", async (req, res) => {
  try {
    const about = await About.findAll();
    res.status(200).json(about);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const about = await About.findOne({ where: { id } });
    res.status(200).json(about);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post("/", checkJWT, async (req, res) => {
  const { about, cv, UserId } = req.body;
  try {
    const aboutt = await About.create({
      about,
      cv,
      UserId,
    });
    res.status(201).json(aboutt);
  } catch (err) {
    res.status(422).json(err);
  }
});

router.put("/:id", checkJWT, validator(aboutForPut, "body"), async (req, res) => {
  const { id } = req.params;
  const { about, cv } = req.body;
  try {
    await About.update({ about, cv }, { where: { id } });
    const aboutt = await About.findByPk(id);
    res.status(202).json(aboutt);
  } catch (err) {
    res.status(422).json(err);
  }
});

module.exports = router;
