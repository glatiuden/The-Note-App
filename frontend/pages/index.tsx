import React, { useCallback, useEffect, useMemo, useState } from "react";
import _ from "lodash";
import { Fade } from "@material-ui/core";
import { useSnackbar } from "notistack";
import Masonry from "react-masonry-css";

import Note from "../models/note";
import { deleteNoteController, getNotesController } from "../controllers/note.controller";

import { useStore } from "../reducers/store";
import { actions } from "../reducers/actions";

import { NoteCardPlaceholder } from "../styles";
import Loader from "../src/Loader";
import NoteCard from "../src/NoteCard";

const Index = () => {
  const [store, dispatch] = useStore();
  const { enqueueSnackbar } = useSnackbar();
  const [initial, setInitial] = useState<boolean>(true); // To show the initial loader

  useEffect(() => {
    setInitial(false);
  }, []);

  useEffect(() => {
    debounceFn(store.search_query);
  }, [store.search_query]);

  /**
   * @description Perform retrieve all notes from database
   * @param search_query Search parameters
   */
  const fetch = async (search_query?: string) => {
    try {
      dispatch({ type: actions.SET_LOADING, payload: true });
      const notes = await getNotesController(search_query);
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

  /**
   * @description Debounce the search function to avoid over-querying
   */
  const debounceFn = useCallback(_.debounce(fetch, 1000), []);

  /**
   * @description Performs deletion of note
   * @param note_id to be deleted
   */
  const onDeleteClick = async (note_id: string) => {
    if (window.confirm("Delete the this note?")) {
      try {
        await deleteNoteController(note_id);
        enqueueSnackbar(`Note ${note_id} has been deleted`, {
          variant: "success",
          autoHideDuration: 5000,
        });
        fetch();
      } catch (err) {
        console.error(err);
        enqueueSnackbar(`Error Encountered: ${err}`, {
          variant: "error",
          autoHideDuration: 10000,
        });
      }
    }
  };

  /**
   * @description Open the dialog and set note_id into the store
   * @param note_id to be edited
   */
  const onEditClick = (note_id: string) => {
    dispatch({
      type: "SET_OPEN_DIALOG",
      payload: {
        is_dialog_open: true,
        note_id,
      },
    });
  };

  /**
   * @description Creates a default create placeholder to be appended to end of the note cards
   */
  const noteCardPlaceholder = (
    <NoteCardPlaceholder
      key="new_note"
      onClick={() =>
        dispatch({
          type: "SET_OPEN_DIALOG",
          payload: {
            is_dialog_open: true,
          },
        })
      }
    >
      {store.notes.length === 0 && "No notes found"}
      <span>Create New Note</span>
    </NoteCardPlaceholder>
  );

  /**
   * @description Retrieve the notes records in store and map into NoteCard
   */
  const noteCards = store.notes.map((note: Note) => {
    return (
      <div key={note._id}>
        <NoteCard note={note} onDeleteClick={onDeleteClick} onEditClick={onEditClick} />
      </div>
    );
  });

  /**
   * @description Masonry Breakpoints
   */
  const masonryBreakpoints = {
    default: 4,
    1100: 3,
    900: 2,
    600: 1,
  };

  /**
   * Memoized the elements to prevent unnecessary re-rendering
   */
  return useMemo(
    () => (
      <>
        {initial && <Loader />}
        <Fade in={!store.is_loading}>
          <Masonry
            breakpointCols={masonryBreakpoints}
            className={store.classes.masonaryGrid}
            columnClassName={store.classes.masonaryGridColumn}
          >
            {noteCards}
            {noteCardPlaceholder}
          </Masonry>
        </Fade>
      </>
    ),
    [store.is_loading, store.notes],
  );
};

export default Index;
