import INoteDb from "../../data-access/interfaces/note-db";
import Note from "../../entities/note";

export type IGetNotes = ({ query }: { query: string }) => Promise<Note[]>;

export default function makeGetNotes({ noteDb }: { noteDb: INoteDb }): IGetNotes {
  return async function getNotes({ query }: { query: string }): Promise<Note[]> {
    const notes = await noteDb.findAll({ query });
    return notes;
  };
}
