import INoteDb from "../../data-access/interfaces/note-db";

export type IHardDeleteNoteById = ({ id }: { id: string }) => Promise<boolean>;

export default function makeHardDeleteNoteById({ noteDb }: { noteDb: INoteDb }): IHardDeleteNoteById {
  return async function hardDeleteNoteById({ id }: { id: string }): Promise<boolean> {
    const existing = await noteDb.findById({ id });
    if (!existing) {
      throw new RangeError(`Note ${id} not found.`);
    }

    const deleted_note = await noteDb.hardDelete({ id });
    return deleted_note;
  };
}
