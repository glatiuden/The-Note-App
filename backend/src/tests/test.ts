import _ from "lodash";
import chai from "chai";
import chaiHttp from "chai-http";
import { app } from "../../index";

chai.use(chaiHttp);
chai.should();

const request = chai.request(app).keepOpen();
const expect = chai.expect;

describe("Notes Postive Test Cases", () => {
  let note_id = ""; // Used in retrieval & deletion test
  describe("POST /", () => {
    it("Should create a note", async () => {
      const res = await request.post("/api/note").send({ title: "New Note", description: "Note created using test" });
      expect(res).to.have.status(200);
      expect(res.body).to.be.an("object");
      expect(res.body).to.haveOwnProperty("data");
      note_id = _.get(res.body, "data._id");
    });
  });

  describe("GET /", () => {
    it("Should fetch all notes", async () => {
      const res = await request.get("/api/note/");
      expect(res).to.have.status(200);
      expect(res.body).to.be.an("object");
      expect(res.body).to.haveOwnProperty("data");
      expect(_.get(res.body, "data")).to.be.an("array");
    });

    it(`Should fetch single note that was previously created`, async () => {
      const res = await request.get(`/api/note/${note_id}`);
      expect(res).to.have.status(200);
      expect(res.body).to.be.an("object");
      expect(res.body).to.haveOwnProperty("data");
    });
  });

  describe("PUT /", () => {
    it(`Should update note that was previously created`, async () => {
      const res = await request.put("/api/note").send({
        _id: note_id,
        title: "Update Note",
        description: "This note is updated in test",
      });
      expect(res).to.have.status(200);
      expect(res.body).to.be.an("object");
      expect(res.body).to.haveOwnProperty("data");
    });
  });

  describe("DELETE /", () => {
    it(`Should soft delete note that was previously created`, async () => {
      const res = await request.delete(`/api/note/${note_id}`);
      expect(res).to.have.status(200);
      expect(res.body).to.be.an("object");
      expect(res.body).to.property("is_deleted", true);
    });

    it("Should hard delete note that was previously created", async () => {
      const res = await request.delete(`/api/note/hard-delete/${note_id}`);
      expect(res).to.have.status(200);
      expect(res.body).to.be.an("object");
      expect(res.body).to.property("is_deleted", true);
    });
  });
});

describe("Notes Negative Test Cases", () => {
  const invalid_note_id = "123";
  const valid_note_id = "613f4186abe8ac519b619877";

  describe("POST /", () => {
    it("Should create a note", async () => {
      const res = await request.post("/api/note").send({ name: "Hello" });
      expect(res).to.have.status(422);
      expect(res.body).to.be.an("object");
      expect(res.body).property("errors");
    });
  });

  describe("GET /", () => {
    it("Should not fetch a note due to invalid ID", async () => {
      const res = await request.get(`/api/note/${invalid_note_id}`);
      expect(res).to.have.status(422);
      expect(res.body).to.be.an("object");
      expect(res.body).property("errors");
    });

    it("Should not fetch a note due to object not found", async () => {
      const res = await request.get(`/api/note/${valid_note_id}`);
      expect(res).to.have.status(404);
      expect(res.body).to.be.an("object");
      expect(res.body).property("errors");
    });
  });

  describe("PUT /", () => {
    it("Should not update any note due to invalid ID", async () => {
      const res = await request.put("/api/note").send({
        _id: invalid_note_id,
        title: "Update Note",
        description: "This note is updated in test",
      });
      expect(res).to.have.status(422);
      expect(res.body).to.be.an("object");
      expect(res.body).property("errors");
    });

    it("Should not update any note due to object not found", async () => {
      const res = await request.put("/api/note").send({
        _id: valid_note_id,
        title: "Update Note",
        description: "This note is updated in test",
      });
      expect(res).to.have.status(404);
      expect(res.body).to.be.an("object");
      expect(res.body).property("errors");
    });
  });

  describe("DELETE /", () => {
    it("Should not soft delete note due to invalid ID", async () => {
      const res = await request.delete(`/api/note/${invalid_note_id}`);
      expect(res).to.have.status(422);
      expect(res.body).to.be.an("object");
      expect(res.body).property("errors");
    });

    it("Should not soft delete note due to object not found", async () => {
      const res = await request.delete(`/api/note/${valid_note_id}`);
      expect(res).to.have.status(404);
      expect(res.body).to.be.an("object");
      expect(res.body).property("errors");
    });

    it("Should not hard delete note due to invalid ID", async () => {
      const res = await request.delete(`/api/note/hard-delete/${invalid_note_id}`);
      expect(res).to.have.status(422);
      expect(res.body).to.be.an("object");
      expect(res.body).property("errors");
    });

    it("Should not hard delete note due to invalid ID", async () => {
      const res = await request.delete(`/api/note/hard-delete/${valid_note_id}`);
      expect(res).to.have.status(404);
      expect(res.body).to.be.an("object");
      expect(res.body).property("errors");
    });
  });
});
