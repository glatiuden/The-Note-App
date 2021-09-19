import Note from "../../entities/note";
import INoteDb from "../../data-access/interfaces/note-db";

export type IDeleteNoteById = ({ id }: { id: string }) => Promise<Note | null>;

export default function makeDeleteNoteById({ noteDb }: { noteDb: INoteDb }): IDeleteNoteById {
  return async function deleteNoteById({ id }: { id: string }): Promise<Note | null> {
    const existing = await noteDb.findById({ id });
    if (!existing) {
      throw new RangeError(`Note ${id} not found.`);
    }

    const deleted_note = await noteDb.delete({ id });
    return deleted_note;
  };
}
