import {
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  List,
  IconButton,
} from "@material-ui/core";
import React, { useEffect, useMemo } from "react";
import { Delete as DeleteIcon, Edit as EditIcon } from "@material-ui/icons";
import Note from "../models/note";
import {
  deleteNoteController,
  getNotesController,
} from "../controllers/note.controller";

import { useStore } from "../reducers/store";
import { actions } from "../reducers/actions";

import Loader from "../src/Loader";

const Index = () => {
  const [store, dispatch] = useStore();

  useEffect(() => {
    fetch();
  }, []);

  const fetch = async () => {
    try {
      dispatch({ type: actions.SET_LOADING, payload: true });
      const notes = await getNotesController();
      dispatch({ type: actions.SET_NOTES, payload: notes });
    } catch (err) {
      console.error(err);
    } finally {
      dispatch({ type: actions.SET_LOADING, payload: false });
    }
  };

  const onDeleteClick = async (note_id: string) => {
    if (window.confirm("Delete the this note?")) {
      try {
        await deleteNoteController(note_id);
        fetch();
      } catch (err) {
        console.error(err);
      }
    }
  };

  const onEditClick = (note_id: string) => {
    dispatch({
      type: "SET_OPEN_DIALOG",
      payload: {
        is_dialog_open: true,
        note_id,
      },
    });
  };

  return useMemo(
    () => (
      <>
        {store.is_loading ? (
          <Loader />
        ) : (
          <List dense={true}>
            {store.notes &&
              store.notes.map((note: Note) => (
                <ListItem key={note._id}>
                  <ListItemText
                    primary={note.title}
                    secondary={note.description}
                  />
                  <ListItemSecondaryAction>
                    <IconButton
                      edge="end"
                      aria-label="edit"
                      onClick={() => onEditClick(note._id)}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      edge="end"
                      aria-label="delete"
                      onClick={() => onDeleteClick(note._id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              ))}
          </List>
        )}
      </>
    ),
    [store.is_loading],
  );
};

export default Index;
