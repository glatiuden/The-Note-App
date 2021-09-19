import { AppBar, Toolbar, Typography, Button } from "@material-ui/core";
import React from "react";
import { useStore } from "../reducers/store";

export default function TheAppBar() {
  const [store, dispatch] = useStore();
  const { classes } = store;

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
        <Typography className={classes.title} variant="h6" noWrap>
          The Note App
        </Typography>
        <Button
          variant="contained"
          color="default"
          disableElevation
          onClick={openDialog}
        >
          Add New Note
        </Button>
      </Toolbar>
    </AppBar>
  );
}
