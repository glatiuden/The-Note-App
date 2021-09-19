import Note from "../../entities/note";
import INote from "../../entities/interfaces/note";
import INoteDb from "../../data-access/interfaces/note-db";

interface ICreateNoteData {
  noteDetails: Omit<INote, "_id">;
}

export type ICreateNote = ({ noteDetails }: ICreateNoteData) => Promise<Note | null>;

export default function makeCreateNote({ noteDb }: { noteDb: INoteDb }): ICreateNote {
  return async function createNote({ noteDetails }: ICreateNoteData): Promise<Note | null> {
    const created_note = await noteDb.insert(noteDetails);
    return created_note;
  };
}
