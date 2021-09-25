import _ from "lodash";
import chai from "chai";
import chaiHttp from "chai-http";
import app from "../../index";

chai.use(chaiHttp);
chai.should();

const request = chai.request(app).keepOpen();
const expect = chai.expect;

describe("Notes Postive Test Cases", () => {
  let note_id = ""; // Used in retrieval & deletion test
  const title = "New note from test";
  const description = "Note created using test";
  const updated_title = "Updated note from test";
  const updated_description = "This note is updated in test";

  describe("POST /", () => {
    it("Should create a note", async () => {
      const res = await request.post("/api/note").send({ title, description });
      expect(res).to.have.status(200);
      expect(res.body).to.be.an("object");
      expect(res.body).to.haveOwnProperty("data");
      expect(res.body).to.property("data").property("title", title);
      expect(res.body).to.property("data").property("description", description);
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

    it("Should fetch single note that was previously created", async () => {
      const res = await request.get(`/api/note/${note_id}`);
      expect(res).to.have.status(200);
      expect(res.body).to.be.an("object");
      expect(res.body).to.haveOwnProperty("data");
      expect(res.body).to.property("data").property("title", title);
      expect(res.body).to.property("data").property("description", description);
    });
  });

  describe("PUT /", () => {
    it("Should update note that was previously created", async () => {
      const res = await request.put("/api/note").send({
        _id: note_id,
        title: updated_title,
        description: updated_description,
      });
      expect(res).to.have.status(200);
      expect(res.body).to.be.an("object");
      expect(res.body).to.haveOwnProperty("data");
      expect(res.body).to.property("data").property("title", updated_title);
      expect(res.body).to.property("data").property("description", updated_description);
    });
  });

  describe("DELETE /", () => {
    it("Should soft delete note that was previously created", async () => {
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
  const invalid_note_id = "123"; // Invalid ID as it is not a valid ObjectID
  const valid_note_id = "613f4186abe8ac519b619877"; // Valid ObjectId but no such record in the DB

  describe("POST /", () => {
    it("Should not create a note", async () => {
      const res = await request.post("/api/note").send({ name: "Hello" });
      expect(res).to.have.status(422);
      expect(res.body).to.be.an("object");
      expect(res.body).haveOwnProperty("errors");
      expect(res.body).property("errors").to.deep.nested.property("title", ["The title field is required."]);
      expect(res.body)
        .property("errors")
        .to.deep.nested.property("description", ["The description field is required."]);
    });
  });

  describe("GET /", () => {
    it("Should not fetch a note due to invalid ID", async () => {
      const res = await request.get(`/api/note/${invalid_note_id}`);
      expect(res).to.have.status(422);
      expect(res.body).to.be.an("object");
      expect(res.body).haveOwnProperty("errors");
      expect(res.body).property("errors").to.deep.nested.property("note_id", ["The note id format is invalid."]);
    });

    it("Should not fetch a note due to record not found", async () => {
      const res = await request.get(`/api/note/${valid_note_id}`);
      expect(res).to.have.status(404);
      expect(res.body).to.be.an("object");
      expect(res.body).haveOwnProperty("errors");
      expect(res.body).property("errors", `Note ${valid_note_id} not found.`);
    });
  });

  describe("PUT /", () => {
    it("Should not update note due to invalid ID", async () => {
      const res = await request.put("/api/note").send({
        _id: invalid_note_id,
        title: "Update Note",
        description: "This note is updated in test",
      });
      expect(res).to.have.status(422);
      expect(res.body).to.be.an("object");
      expect(res.body).haveOwnProperty("errors");
      expect(res.body).property("errors").to.deep.nested.property("_id", ["The  id format is invalid."]);
    });

    it("Should not update note due to record not found", async () => {
      const res = await request.put("/api/note").send({
        _id: valid_note_id,
        title: "Update Note",
        description: "This note is updated in test",
      });
      expect(res).to.have.status(404);
      expect(res.body).to.be.an("object");
      expect(res.body).haveOwnProperty("errors");
      expect(res.body).property("errors", `Note ${valid_note_id} not found.`);
    });
  });

  describe("DELETE /", () => {
    it("Should not soft delete note due to invalid ID", async () => {
      const res = await request.delete(`/api/note/${invalid_note_id}`);
      expect(res).to.have.status(422);
      expect(res.body).to.be.an("object");
      expect(res.body).haveOwnProperty("errors");
      expect(res.body).property("errors").to.deep.nested.property("note_id", ["The note id format is invalid."]);
    });

    it("Should not soft delete note due to record not found", async () => {
      const res = await request.delete(`/api/note/${valid_note_id}`);
      expect(res).to.have.status(404);
      expect(res.body).to.be.an("object");
      expect(res.body).haveOwnProperty("errors");
      expect(res.body).property("errors", `Note ${valid_note_id} not found.`);
    });

    it("Should not hard delete note due to invalid ID", async () => {
      const res = await request.delete(`/api/note/hard-delete/${invalid_note_id}`);
      expect(res).to.have.status(422);
      expect(res.body).to.be.an("object");
      expect(res.body).haveOwnProperty("errors");
      expect(res.body).property("errors").to.deep.nested.property("note_id", ["The note id format is invalid."]);
    });

    it("Should not hard delete note due to record not found", async () => {
      const res = await request.delete(`/api/note/hard-delete/${valid_note_id}`);
      expect(res).to.have.status(404);
      expect(res.body).to.be.an("object");
      expect(res.body).haveOwnProperty("errors");
      expect(res.body).property("errors", `Note ${valid_note_id} not found.`);
    });
  });
});
