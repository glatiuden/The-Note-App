import _ from "lodash";
import axios from "axios";
import Note from "../models/note";

const DB_HOST_URL = "https://asia-southeast1-cs3219-otot-task-b-325509.cloudfunctions.net/cs3219-otot-task-b-dev-app";

export async function getNotesController() {
  const { data } = await axios.get(`${DB_HOST_URL}/api/note/`);
  const notes = _.get(data, "data").map((note) => new Note(note));
  return notes;
}

export async function getNoteController(note_id: string) {
  const { data } = await axios.get(`${DB_HOST_URL}/api/note/${note_id}`);
  return new Note(_.get(data, "data"));
}

export async function createNoteController(note: Partial<Note>) {
  const { data } = await axios.post(`${DB_HOST_URL}/api/note/`, note);
  return new Note(_.get(data, "data"));
}

export async function updateNoteController(note: Partial<Note>) {
  const { data } = await axios.put(`${DB_HOST_URL}/api/note/`, note);
  return new Note(_.get(data, "data"));
}

export async function deleteNoteController(note_id: string) {
  const { data } = await axios.delete(`${DB_HOST_URL}/api/note/hard-delete/${note_id}`);
  return _.get(data, "data.is_deleted");
}
