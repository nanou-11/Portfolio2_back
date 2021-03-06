const chai = require("chai");
const chaiHtpp = require("chai-http");
let should = chai.should();
const sequelize = require("../sequelize");

let server = require("../index");

const User = require("../models/User");

chai.use(chaiHtpp);

let userId;

describe("USERS", () => {
  before(async () => {
    await sequelize.sync({ force: true });
    const user = await User.create({
      lastName: "JOUARET",
      firstName: "Anais",
      password: "roxane23",
      email: "anais.jouaret@gmail.com",
      github: "http://gihub",
      linkedin: "linkdin",
    });
    userId = user.dataValues.id;
  });
  describe("GET ALL", () => {
    it("should success", async () => {
      try {
        const res = await chai.request(server).get("/user");
        res.should.have.status(200);
        res.body.should.be.a("array");
        res.body.length.should.be.eql(1);
      } catch (err) {
        throw err;
      }
    });
  });
  describe("GET ONE", () => {
    it("should success", async () => {
      try {
        const res = await chai.request(server).get(`/user/${userId}`);
        res.should.have.status(200);
        res.body.should.be.a("object");
        res.body.should.have.keys([
          "id",
          "lastName",
          "firstName",
          "email",
          "password",
          "github",
          "linkedin",
          "createdAt",
          "updatedAt",
        ]);
      } catch (err) {
        throw err;
      }
    });
  });
  describe("PUT", () => {
    it("should success", async () => {
      try {
        const res = await chai
          .request(server)
          .put(`/user/${userId}`)
          .send({ firstName: "bonjour" });
        res.should.have.status(202);
        res.body.should.be.a("object");
        res.body.should.have.keys([
          "id",
          "lastName",
          "firstName",
          "email",
          "password",
          "github",
          "linkedin",
          "createdAt",
          "updatedAt",
        ]);
      } catch (err) {
        throw err;
      }
    });
    it("should failed", async () => {
      try {
        const res = await chai
          .request(server)
          .put(`/user/${userId}`)
          .send({ hello: "bonjour" });
        res.should.have.status(422);
        res.body.should.be.a("object");
      } catch (err) {
        throw err;
      }
    });
  });
});
