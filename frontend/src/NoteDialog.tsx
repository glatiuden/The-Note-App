import _ from "lodash";
import React, { useEffect, useState } from "react";
import { useSnackbar } from "notistack";
import { formatDate } from "../utils";

import { useTheme } from "@material-ui/core/styles";
import {
  Dialog,
  DialogContent,
  DialogActions,
  Button,
  Toolbar,
  InputBase,
  useMediaQuery,
  AppBar,
  IconButton,
  Typography,
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import Loader from "./Loader";

import Note from "../models/note";
import {
  createNoteController,
  getNoteController,
  getNotesController,
  updateNoteController,
} from "../controllers/note.controller";
import { actions } from "../reducers/actions";
import { useStore } from "../reducers/store";

const NoteDialog = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [store, dispatch] = useStore();
  const { classes } = store;
  const is_edit = _.get(store, "is_edit");

  const theme = useTheme();
  const is_mobile = useMediaQuery(theme.breakpoints.down("xs"));

  const [note, setNote] = useState<Partial<Note>>({
    title: "",
    description: "",
    updated_at: undefined,
  });

  useEffect(() => {
    const note_id = _.get(store, "note_id");
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
      enqueueSnackbar(`Error Encountered: ${err}`, {
        variant: "error",
        autoHideDuration: 10000,
      });
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
        enqueueSnackbar(`Note ${note._id} has been updated`, {
          variant: "success",
          autoHideDuration: 5000,
        });
      } else {
        await createNoteController(note);
        enqueueSnackbar(`Note ${note.title} has been created`, {
          variant: "success",
          autoHideDuration: 5000,
        });
      }
      await fetch();
    } catch (err) {
      console.error(err);
      enqueueSnackbar(`Error Encountered: ${err}`, {
        variant: "error",
        autoHideDuration: 10000,
      });
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

  const dialogAppBar = is_mobile && (
    <>
      <AppBar className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" className={classes.dialogAppBar}>
            {is_edit ? "Edit" : "Add New"} Note
          </Typography>
          <IconButton edge="end" color="inherit" onClick={handleClose} aria-label="close">
            <CloseIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <div style={{ marginBottom: theme.spacing(5) }}></div>
    </>
  );

  return (
    <Dialog
      open={store.is_dialog_open}
      onClose={handleClose}
      fullWidth
      keepMounted
      maxWidth="sm"
      fullScreen={is_mobile}
    >
      <form>
        {dialogAppBar}
        <DialogContent dividers>
          <InputBase
            name="title"
            placeholder="Title"
            inputProps={{ "aria-label": "naked", style: { fontSize: 20 } }}
            className={classes.margin}
            fullWidth
            value={note.title}
            onChange={onTextChange}
          />

          <InputBase
            name="description"
            placeholder="Enter description of the note"
            inputProps={{ "aria-label": "naked" }}
            className={classes.margin}
            fullWidth
            multiline
            minRows={3}
            value={note.description}
            onChange={onTextChange}
          />
          <Loader />
        </DialogContent>
        <DialogActions className={classes.dialogActions}>
          {note.updated_at && <i>{`Last updated ${formatDate(note.updated_at)}`}</i>}
          <div className={classes.grow} />
          <Button onClick={handleClose} color="secondary" disabled={store.is_loading}>
            Cancel
          </Button>
          <Button onClick={onSubmit} color="primary" disabled={store.is_loading || validate()}>
            Save
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default NoteDialog;
