require("dotenv").config();
const express = require("express");
const cors = require("cors");

const sequelize = require("./sequelize");
require("./association");
const auth = require("./routes/auth.route");
const user = require("./routes/user.route");
const works = require("./routes/works.route");
const mail = require("./routes/mail.route");
const about = require("./routes/about.route");
const User = require("./models/User");

const port = process.env.PORT || 4000;

const app = express();

app.use(express.json());
app.use(cors());

app.use("/auth", auth);
app.use("/user", user);
app.use("/works", works);
app.use("/sendMail", mail);
app.use("/about", about);

app.get("/", (req, res) => {
  res.status(200).send("Bienvenue sur Mon Portfolio");
});

sequelize
  .sync()
  .then(() => {
    return sequelize.authenticate();
  })
  .then(() => {
    return Promise.all([
      User.findCreateFind({
        where: { email: process.env.EMAIL },
        defaults: {
          lastName: "Jouaret",
          firstName: "Anaïs",
          password: process.env.EMAILPASS,
          github: "https://github.com/nanou-11",
          linkedin: "https://www.linkedin.com/in/anais-jouaret/",
        },
      }),
    ]);
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

module.exports = app;
