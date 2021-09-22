import express from "express";
import makeExpressCallback from "../express-callback";
import makeValidator from "../middlewares/validator-middleware";
import { createNoteRules, getNoteRules, updateNoteRules, deleteNoteRules } from "../controllers/note/validators";
import {
  createNoteController,
  getNoteController,
  getNotesController,
  updateNoteController,
  deleteNoteController,
  hardDeleteNoteController,
} from "../controllers/note";

const noteRouter = express.Router();

noteRouter.post("/", makeValidator(createNoteRules), makeExpressCallback(createNoteController));
noteRouter.get("/", makeExpressCallback(getNotesController));
noteRouter.get("/:note_id", makeValidator(getNoteRules), makeExpressCallback(getNoteController));
noteRouter.put("/", makeValidator(updateNoteRules), makeExpressCallback(updateNoteController));
noteRouter.delete("/:note_id", makeValidator(deleteNoteRules), makeExpressCallback(deleteNoteController));
noteRouter.delete(
  "/hard-delete/:note_id",
  makeValidator(deleteNoteRules),
  makeExpressCallback(hardDeleteNoteController),
);

export default noteRouter;
