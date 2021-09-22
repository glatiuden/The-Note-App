import mongoose from "mongoose";
import noteSchema from "../schemas/note";
import INote from "../../entities/interfaces/note";

const NoteDbModel = mongoose.model<INote & mongoose.Document>("Note", noteSchema);

export default Object.freeze({ NoteDbModel });
export { NoteDbModel };
