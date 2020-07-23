const chai = require("chai");
const chaiHtpp = require("chai-http");
let should = chai.should();
const sequelize = require("../sequelize");

let server = require("../index");

const About = require("../models/About");
const User = require("../models/User");

chai.use(chaiHtpp);

let aboutId;
let userId;

describe("ABOUT", () => {
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
    const about = await About.create({
      about: "hello world",
      cv: "cv",
      UserId: userId,
    });
    aboutId = about.dataValues.id;
  });
  describe("GET ALL", () => {
    it("should success", async () => {
      try {
        const res = await chai.request(server).get("/about");
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
        const res = await chai.request(server).get(`/about/${aboutId}`);
        res.should.have.status(200);
        res.body.should.be.a("object");
        res.body.should.have.keys([
          "id",
          "about",
          "cv",
          "createdAt",
          "updatedAt",
          "UserId",
        ]);
      } catch (err) {
        throw err;
      }
    });
  });
  describe("POST", () => {
    it("should success", async () => {
      try {
        const res = await chai.request(server).post("/about").send({
          about: " helscslo",
          cv: "bcjkdsbckjdsbck",
          UserId: userId,
        });
        res.should.have.status(201);
        res.body.should.be.a("object");
        res.body.should.have.keys([
          "id",
          "about",
          "cv",
          "createdAt",
          "updatedAt",
          "UserId",
        ]);
      } catch (err) {
        throw err;
      }
    });
    it("should fail", async () => {
      try {
        const res = await chai
          .request(server)
          .post("/about")
          .send({ about: "Doe" });
        res.should.have.status(422);
        res.body.should.be.a("object");
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
          .put(`/about/${aboutId}`)
          .send({ about: "bonjour" });
        res.should.have.status(202);
        res.body.should.be.a("object");
        res.body.should.have.keys([
          "id",
          "about",
          "cv",
          "createdAt",
          "updatedAt",
          "UserId",
        ]);
      } catch (err) {
        throw err;
      }
    });
    it("should failed", async () => {
      try {
        const res = await chai
          .request(server)
          .put(`/about/${aboutId}`)
          .send({ hello: "bonjour" });
        res.should.have.status(422);
        res.body.should.be.a("object");
      } catch (err) {
        throw err;
      }
    });
  });
});
