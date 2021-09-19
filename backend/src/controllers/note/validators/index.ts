import getNoteRules from "./get-note";
import updateNoteRules from "./update-note";
import createNoteRules from "./create-note";
import deleteNoteRules from "./delete-note";

export default Object.freeze({
  getNoteRules,
  createNoteRules,
  updateNoteRules,
  deleteNoteRules,
});

export { getNoteRules, createNoteRules, updateNoteRules, deleteNoteRules };
