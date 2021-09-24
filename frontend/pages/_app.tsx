import React, { useEffect } from "react";
import PropTypes from "prop-types";
import Head from "next/head";

import { SnackbarProvider } from "notistack";
import { ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";

import theme from "../src/theme";
import { useStyles } from "../styles";

import { StoreProvider } from "../reducers/store";
import { noteReducer } from "../reducers/reducer";

import NoteDialog from "../src/NoteDialog";
import NoteAppBar from "../src/NoteAppBar";

export default function MyApp(props) {
  const { Component, pageProps } = props;
  const classes = useStyles();

  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  const defaultState = {
    is_loading: true,
    is_dialog_open: false,
    notes: [],
    classes,
    search_query: "",
  };

  return (
    <>
      <Head>
        <title>The Note App</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>
      <StoreProvider initialState={defaultState} reducer={noteReducer}>
        <SnackbarProvider
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
        >
          <ThemeProvider theme={theme}>
            <div className={classes.root}>
              <CssBaseline />
              <NoteAppBar />
              <main className={classes.content}>
                <div className={classes.toolbar} />
                <Component {...pageProps} />
              </main>
            </div>
          </ThemeProvider>
          <NoteDialog />
        </SnackbarProvider>
      </StoreProvider>
    </>
  );
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired,
};
