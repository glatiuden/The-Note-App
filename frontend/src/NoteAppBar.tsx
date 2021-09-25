import React from "react";
import { AppBar, Toolbar, Typography, Button, InputBase, useMediaQuery, InputAdornment } from "@material-ui/core";
import { Note as NoteIcon, Search as SearchIcon } from "@material-ui/icons";

import { actions } from "../reducers/actions";
import { useStore } from "../reducers/store";
import { useTheme } from "@material-ui/core/styles";

const NoteAppBar = () => {
  const [store, dispatch] = useStore();
  const { classes } = store;
  const theme = useTheme();
  const is_mobile = useMediaQuery(theme.breakpoints.down("xs"));

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
        <NoteIcon fontSize="large" className={classes.title} style={{ marginRight: 8 }} />
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
            style={{ color: "white" }}
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
        <Button variant="outlined" style={{ color: "white" }} onClick={openDialog}>
          Add {!is_mobile ? "New Note" : ""}
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default NoteAppBar;
