import React, { useEffect, useState } from "react";
import _ from "lodash";

import {
  Dialog,
  DialogTitle,
  IconButton,
  DialogContent,
  TextField,
  DialogActions,
  Button,
  Toolbar,
  Typography,
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";

import Note from "../models/note";
import { useStore } from "../reducers/store";
import Loader from "./Loader";
import {
  createNoteController,
  getNoteController,
  getNotesController,
  updateNoteController,
} from "../controllers/note.controller";
import { actions } from "../reducers/actions";

const NoteDialog = () => {
  const [store, dispatch] = useStore();
  const { classes } = store;
  const is_edit = _.get(store, "is_edit");

  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [note, setNote] = useState<Partial<Note>>({
    title: "",
    description: "",
  });

  useEffect(() => {
    const note_id = _.get(store, "note_id");
    const is_edit_note = !!note_id;
    setIsEdit(is_edit_note);
    if (is_edit) {
      getNoteForUpdate(note_id);
    }
  }, [store.note_id]);

  const getNoteForUpdate = async (note_id: string) => {
    const note = await getNoteController(note_id);
    if (note) {
      setNote(note);
    }
  };

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

  const onSubmit = async (e: any) => {
    e.preventDefault();
    try {
      dispatch({ type: actions.SET_LOADING, payload: true });
      if (is_edit) {
        await updateNoteController(note);
      } else {
        await createNoteController(note);
      }
      await fetch();
    } catch (err) {
      console.error(err);
    } finally {
      handleClose();
    }
  };

  //#region Text Fields
  const onTextChange = (e: any) => {
    const { name, value } = e.target;
    const _note = { ...note };
    _note[name] = value;
    setNote(_note);
  };

  const handleClose = () => {
    // Stop Loading
    dispatch({
      type: actions.SET_LOADING,
      payload: false,
    });
    // Reset Note State
    setNote({
      title: "",
      description: "",
    });
    // Close the Dialog
    dispatch({
      type: actions.SET_OPEN_DIALOG,
      payload: {
        is_dialog_open: false,
        note_id: undefined,
      },
    });
  };

  const validate = () => {
    for (const key in note) {
      if (note[key] === "") {
        return true;
      }
    }
    return false;
  };

  return (
    <Dialog
      open={store.is_dialog_open}
      onClose={handleClose}
      fullWidth
      keepMounted
      maxWidth="sm"
    >
      <DialogTitle>
        <Toolbar
          variant="dense"
          className={classes.dialogToolbar}
          disableGutters
        >
          <Typography variant="h6" className={classes.title}>
            {isEdit ? "Edit" : "Add New"} Note
          </Typography>

          <IconButton
            edge="start"
            color="inherit"
            onClick={handleClose}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>
        </Toolbar>
      </DialogTitle>

      <DialogContent dividers>
        <form noValidate autoComplete="off">
          <TextField
            label="Title"
            name="title"
            variant="outlined"
            fullWidth
            value={note.title}
            onChange={onTextChange}
          />
          <br />
          <br />
          <TextField
            label="Description"
            name="description"
            variant="outlined"
            fullWidth
            multiline
            minRows={3}
            value={note.description}
            onChange={onTextChange}
          />
        </form>
        {store.is_loading && <Loader />}
      </DialogContent>
      <DialogActions>
        <Button
          onClick={handleClose}
          color="secondary"
          variant="outlined"
          disabled={store.is_loading}
        >
          Cancel
        </Button>
        <Button
          onClick={onSubmit}
          color="primary"
          variant="outlined"
          disabled={store.is_loading || validate()}
        >
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default NoteDialog;
