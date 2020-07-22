require("dotenv").config();
const express = require("express");
const cors = require("cors");

const sequelize = require("./sequelize");
const auth = require("./routes/auth.route");
const user = require("./routes/user.route");
const works = require("./routes/works.route");

const port = process.env.PORT || 4000;

const app = express();

app.use(express.json());
app.use(cors());

app.use("/auth", auth);
app.use("/user", user);
app.use("/works", works);

app.get("/", (req, res) => {
  res.status(200).send("Bienvenue sur Mon Portfolio");
});

if (process.env.NODE_ENV !== "test") {
  sequelize
    .sync()
    .then(() => {
      return sequelize.authenticate();
    })
    .then(() => {
      app.listen(port, (err) => {
        if (err) {
          throw new Error("Something really bad happened ...");
        }
        console.log(`Server is listening on ${port}`);
      });
    })
    .catch((err) => {
      console.log("unable to join database", err.message);
    });
}

module.exports = app;
