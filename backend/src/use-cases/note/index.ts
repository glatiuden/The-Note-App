import { NoteDb } from "../../data-access";

import makeCreateNote from "./create-note";
import makeGetNoteById from "./get-note-by-id";
import makeGetNotes from "./get-notes";
import makeUpdateNote from "./update-note";
import makeDeleteNoteById from "./delete-note-by-id";
import makeHardDeleteNoteById from "./hard-delete-note-by-id";

/**
 * @description Use case to create a new note
 * @function createNote
 */
const createNote = makeCreateNote({ noteDb: NoteDb });

/**
 * @description Use case to get note by ID
 * @function getNoteById
 */
const getNoteById = makeGetNoteById({ noteDb: NoteDb });

/**
 * @description Use case to get all notes
 * @function getNotes
 */
const getNotes = makeGetNotes({ noteDb: NoteDb });

/**
 * @description Use case to update note
 * @function updateNote
 */
const updateNote = makeUpdateNote({ noteDb: NoteDb });

/**
 * @description Use case to delete note by ID
 * @function deleteNoteById
 */
const deleteNoteById = makeDeleteNoteById({ noteDb: NoteDb });

/**
 * @description Use case to hard delete note by ID
 * @function hardDeleteNoteById
 */
const hardDeleteNoteById = makeHardDeleteNoteById({ noteDb: NoteDb });

const noteServices = Object.freeze({
  createNote,
  getNoteById,
  getNotes,
  updateNote,
  deleteNoteById,
  hardDeleteNoteById,
});

export default noteServices;
export {
  createNote,
  getNoteById,
  getNotes,
  updateNote,
  deleteNoteById,
  hardDeleteNoteById,
};
