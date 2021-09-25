import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  InputBase,
  useMediaQuery,
  InputAdornment,
  IconButton,
} from "@material-ui/core";
import { Note as NoteIcon, Search as SearchIcon, Clear as ClearIcon } from "@material-ui/icons";

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

  function clearClick() {
    dispatch({ type: actions.SET_SEARCH_QUERY, payload: "" });
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
            endAdornment={
              !!store.search_query && (
                <InputAdornment position="start" className={classes.white}>
                  <IconButton size="small" style={{ color: "white" }} onClick={clearClick}>
                    <ClearIcon />
                  </IconButton>
                </InputAdornment>
              )
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
