import Note from "../../entities/note";

export default interface INoteDb {
  insert: (insertPayload: Partial<Note>) => Promise<Note | null>;
  findById: ({ id }: { id: string }) => Promise<Note | null>;
  findAll: ({ query }: { query?: string }) => Promise<Note[]>;
  update: (updatePayload: Partial<Note>) => Promise<Note | null>;
  delete: ({ id }: { id: string }) => Promise<Note | null>;
  hardDelete: ({ id }: { id: string }) => Promise<boolean>;
}
