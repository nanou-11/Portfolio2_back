const express = require("express");
const router = express.Router();
const Work = require("../models/Work");
const checkJWT = require("../middleware/checkJWT");
const { validator, worksForPut } = require("../middleware/validator");

router.get("/", async (req, res) => {
  try {
    const projects = await Work.findAll();
    res.status(200).json(projects);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const project = await Work.findOne({ where: { id } });
    res.status(200).json(project);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post("/", checkJWT, async (req, res) => {
  const {
    label,
    url,
    description,
    tools,
    screenshot1,
    screenshot2,
    screenshot3,
    date,
    UserId,
  } = req.body;
  try {
    const project = await Work.create({
      label,
      url,
      description,
      tools,
      screenshot1,
      screenshot2,
      screenshot3,
      date,
      UserId,
    });
    res.status(201).json(project);
  } catch (err) {
    res.status(422).json(err);
  }
});

router.put(
  "/:id",
  checkJWT,
  validator(worksForPut, "body"),
  async (req, res) => {
    const { id } = req.params;
    const {
      label,
      url,
      description,
      tools,
      screenshot1,
      screenshot2,
      screenshot3,
      date,
      UserId,
    } = req.body;
    try {
      await Work.update(
        {
          label,
          url,
          description,
          tools,
          screenshot1,
          screenshot2,
          screenshot3,
          date,
          UserId,
        },
        { where: { id } }
      );
      const project = await Work.findByPk(id);
      res.status(202).json(project);
    } catch (err) {
      res.status(422).json(err);
    }
  }
);

router.delete("/:id", checkJWT, async (req, res) => {
  try {
    const { id } = req.params;
    await Work.destroy({ where: { id } });
    res.status(204).send("Le projet a bien été effacé");
  } catch (err) {
    res.status(422).json(err);
  }
});

module.exports = router;
