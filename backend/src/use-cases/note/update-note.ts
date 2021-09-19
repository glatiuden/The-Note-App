import Note from "../../entities/note";
import INoteDb from "../../data-access/interfaces/note-db";
import INote from "../../entities/interfaces/note";

export type IUpdateNote = ({ noteDetails }: { noteDetails: INote }) => Promise<Note | null>;

export default function makeUpdateNote({ noteDb }: { noteDb: INoteDb }): IUpdateNote {
  return async function updateNote({ noteDetails }: { noteDetails: INote }): Promise<Note | null> {
    const { _id: note_id } = noteDetails;
    const existing = await noteDb.findById({ id: note_id });
    if (!existing) {
      throw new RangeError(`Note ${note_id} not found.`);
    }

    const note = new Note(Object.assign({}, existing, noteDetails, { updated_at: new Date() }));
    const updated_note = await noteDb.update(note);
    return updated_note;
  };
}
