import Note from "../../entities/note";
import INoteDb from "../../data-access/interfaces/note-db";

export type IGetNoteById = ({ id }: { id: string }) => Promise<Note | null>;

export default function makeGetNoteById({ noteDb }: { noteDb: INoteDb }): IGetNoteById {
  return async function getNoteById({ id }: { id: string }): Promise<Note | null> {
    const note = await noteDb.findById({ id });
    if (!note) {
      throw new RangeError(`Note ${id} not found.`);
    }

    return note;
  };
}
