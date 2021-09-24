import mongoose from "mongoose";

import INoteDb from "./interfaces/note-db";

import Note from "../entities/note";
import INote from "../entities/interfaces/note";

function makeNoteDb({ noteDbModel }: { noteDbModel: mongoose.Model<INote & mongoose.Document> }): INoteDb {
  return new (class MongooseNoteDb implements INoteDb {
    async insert(insertPayload: Partial<INote>): Promise<Note | null> {
      const result = await noteDbModel.create([insertPayload]);
      const updated = await noteDbModel.findOne({ _id: result[0]?._id });
      if (updated) {
        return new Note(updated);
      }
      return null;
    }

    async findById({ id }: { id: string }): Promise<Note | null> {
      const existing = await noteDbModel.findById(id);
      if (existing) {
        return new Note(existing);
      }
      return null;
    }

    async findAll({ query = "" }: { query?: string }): Promise<Note[]> {
      const query_conditions = { deleted_at: undefined };
      if (query) {
        query_conditions["$or"] = [
          { title: { $regex: ".*" + query + ".*", $options: "si" } },
          { description: { $regex: ".*" + query + ".*", $options: "si" } },
        ];
      }

      const existing = await noteDbModel.find(query_conditions).sort({ updated_at: "desc" });
      if (existing) {
        return existing.map((note) => new Note(note));
      }
      return [];
    }

    async update(payload: Partial<INote>): Promise<Note | null> {
      await noteDbModel.findOneAndUpdate({ _id: payload._id }, payload);
      const updated = await noteDbModel.findById({ _id: payload._id });
      if (updated) {
        return new Note(updated);
      }
      return null;
    }

    async hardDelete({ id }: { id: string }): Promise<boolean> {
      const result = await noteDbModel.deleteOne({ _id: id });
      return result.deletedCount > 0;
    }

    async delete({ id }: { id: string }): Promise<Note | null> {
      const existing = await noteDbModel.findOneAndUpdate({ _id: id }, { deleted_at: new Date() });
      if (existing) {
        return new Note(existing);
      }
      return null;
    }
  })();
}

export default makeNoteDb;
