const chai = require("chai");
const chaiHtpp = require("chai-http");
let should = chai.should();
const sequelize = require("../sequelize");

let server = require("../index");

const Work = require("../models/Work");
const User = require("../models/User");

chai.use(chaiHtpp);

let workId;
let userId;

describe("WORK", () => {
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

    const work = await Work.create({
      label: "hello world",
      url: "cv",
      description: "hjbcdksjqnc",
      tools: "cbdjsbcdlkq",
      screenshot1: "bcjdslqk",
      screenshot2: "bckdslnqdio,",
      screenshot3: "bcjsdbnqcoidsn",
      date: "jucbdskj",
      UserId: userId,
    });
    workId = work.dataValues.id;
  });
  describe("GET ALL", () => {
    it("should success", async () => {
      try {
        const res = await chai.request(server).get("/works");
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
        const res = await chai.request(server).get(`/works/${workId}`);
        res.should.have.status(200);
        res.body.should.be.a("object");
        res.body.should.have.keys([
          "id",
          "label",
          "url",
          "description",
          "tools",
          "screenshot1",
          "screenshot2",
          "screenshot3",
          "date",
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
        const res = await chai.request(server).post("/works").send({
          label: " helscslo",
          url: "bcjkdsbckjdsbck",
          description: "bcjdsnk",
          tools: "ncjodsnlcdk",
          screenshot1: "ujbcodsnl",
          screenshot2: "jbcskj cqn",
          screenshot3: "bcdsjbc",
          date: "bcjsdnlcd",
          UserId: userId,
        });
        res.should.have.status(201);
        res.body.should.be.a("object");
        res.body.should.have.keys([
          "id",
          "label",
          "url",
          "description",
          "tools",
          "screenshot1",
          "screenshot2",
          "screenshot3",
          "date",
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
          .post("/works")
          .send({ label: "Doe" });
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
          .put(`/works/${workId}`)
          .send({ label: "bonjour" });
        res.should.have.status(202);
        res.body.should.be.a("object");
        res.body.should.have.keys([
          "id",
          "label",
          "url",
          "description",
          "tools",
          "screenshot1",
          "screenshot2",
          "screenshot3",
          "date",
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
          .put(`/works/${workId}`)
          .send({ hello: "bonjour" });
        res.should.have.status(422);
        res.body.should.be.a("object");
      } catch (err) {
        throw err;
      }
    });
  });
});
