import INote from "./interfaces/note";

export default class Note implements INote {
  public readonly _id: string;
  public readonly title: string;
  public readonly description: string;
  public readonly deleted_at?: Date;
  public readonly created_at: Date;
  public readonly updated_at: Date;

  constructor({ _id, title, description, deleted_at, created_at, updated_at }: INote) {
    if (!_id) {
      throw new Error("Note must have a _id.");
    }

    if (!title) {
      throw new Error("Note must have a title.");
    }

    this._id = _id;
    this.title = title;
    this.description = description;
    this.deleted_at = deleted_at;
    this.created_at = created_at;
    this.updated_at = updated_at;
  }
}
