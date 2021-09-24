import React from "react";
import _ from "lodash";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  InputBase,
  useMediaQuery,
  InputAdornment,
} from "@material-ui/core";
import { Note as NoteIcon, Search as SearchIcon } from "@material-ui/icons";

import { actions } from "../reducers/actions";
import { useStore } from "../reducers/store";
import { useTheme } from "@material-ui/core/styles";

const NoteAppBar = () => {
  const [store, dispatch] = useStore();
  const { classes } = store;
  const theme = useTheme();
  const is_small_screen = useMediaQuery(theme.breakpoints.down("sm"));

  function handleChange(event) {
    dispatch({ type: actions.SET_SEARCH_QUERY, payload: event.target.value });
  }

  const openDialog = () => {
    dispatch({
      type: "SET_OPEN_DIALOG",
      payload: {
        is_dialog_open: true,
      },
    });
  };

  return (
    <AppBar position="fixed" className={classes.appBar}>
      <Toolbar>
        <NoteIcon
          fontSize="large"
          className={classes.title}
          style={{ marginRight: 8 }}
        />
        <Typography className={classes.title} variant="h6" noWrap>
          The Note App
        </Typography>
        <div className={classes.searchBox}>
          <InputBase
            placeholder="Search…"
            className={classes.inputRoot}
            inputProps={{
              "aria-label": "search",
            }}
            startAdornment={
              <InputAdornment position="end" className={classes.white}>
                <SearchIcon />
              </InputAdornment>
            }
            value={store.search_query}
            onChange={handleChange}
          />
        </div>
        <div className={classes.grow} />
        <Button
          variant="outlined"
          className={classes.white}
          onClick={openDialog}
        >
          Add {!is_small_screen ? "New Note" : ""}
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default NoteAppBar;
