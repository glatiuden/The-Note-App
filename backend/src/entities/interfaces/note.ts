export default interface INote {
  _id: string;
  title: string;
  description: string;
  deleted_at?: Date;
  created_at: Date;
  updated_at: Date;
}
