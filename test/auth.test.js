const chai = require("chai");
const chaiHtpp = require("chai-http");
let should = chai.should();
const sequelize = require("../sequelize");

let server = require("../index");

const User = require("../models/User");

chai.use(chaiHtpp);

let userId;
let user;

describe("AUTH", () => {
  before(async () => {
    await sequelize.sync({ force: true });
    user = await User.create({
      lastName: "JOUARET",
      firstName: "Anais",
      password: "roxane23",
      email: "anais.jouaret@gmail.com",
      github: "http://gihub",
      linkedin: "linkdin",
    });
    userId = user.dataValues.id;
  });
  describe("POST", () => {
    it("should success", async () => {
      try {
        const res = await chai.request(server).post("/auth/login").send({
          email: user.dataValues.email,
          password: user.dataValues.password,
        });
        res.should.have.status(200);
        res.body.should.be.a("object");
        res.body.should.have.keys([
          "id",
          "lastName",
          "firstName",
          "password",
          "email",
          "github",
          "linkedin",
          "createdAt",
          "updatedAt",
        ]);
      } catch (err) {
        throw err;
      }
    });
    it("should fail", async () => {
      try {
        const res = await chai
          .request(server)
          .post("/auth/login")
          .send({ about: "Doe" });
        res.should.have.status(422);
        res.body.should.be.a("object");
      } catch (err) {
        throw err;
      }
    });
  });
});
