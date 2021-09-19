import { logger } from "../../config/logs";

import {
  createNote,
  getNoteById,
  getNotes,
  updateNote,
  deleteNoteById,
  hardDeleteNoteById,
} from "../../use-cases/note";

import makeCreateNoteController from "./create-note";
import makeGetNoteController from "./get-note";
import makeGetNotes from "./get-notes";
import makeUpdateNoteController from "./update-note";
import makeDeleteNoteController from "./delete-note";
import makeHardDeleteNoteController from "./hard-delete-note";

/**
 * @description Create new note
 * @function createNoteController
 */
const createNoteController = makeCreateNoteController({ createNote, logger });

/**
 * @description Get note by ID
 * @function getNoteController
 */
const getNoteController = makeGetNoteController({ getNoteById, logger });

/**
 * @description Get all notes
 * @function getNotesController
 */
const getNotesController = makeGetNotes({ getNotes, logger });

/**
 * @description Update note's details
 * @function updateNoteController
 */
const updateNoteController = makeUpdateNoteController({ updateNote, logger });

/**
 * @description Soft delete a note
 * @function deleteNoteController
 */
const deleteNoteController = makeDeleteNoteController({ deleteNoteById, logger });

/**
 * @description Hard delete a note
 * @function hardDeleteNoteController
 */
const hardDeleteNoteController = makeHardDeleteNoteController({ hardDeleteNoteById, logger });

const noteController = Object.freeze({
  createNoteController,
  getNoteController,
  deleteNoteController,
  updateNoteController,
  getNotesController,
  hardDeleteNoteController,
});

export default noteController;
export {
  createNoteController,
  getNoteController,
  deleteNoteController,
  updateNoteController,
  getNotesController,
  hardDeleteNoteController,
};
