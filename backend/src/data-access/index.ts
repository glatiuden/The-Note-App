import makeNoteDb from "./make-note-db";
import { NoteDbModel } from "./models";

const NoteDb = makeNoteDb({ noteDbModel: NoteDbModel });

export default Object.freeze({ NoteDb });
export { NoteDb };
