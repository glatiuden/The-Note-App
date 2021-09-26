import { Paper, Theme } from "@material-ui/core";
import { alpha, makeStyles, styled } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: "flex",
    flexGrow: 1,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    padding: theme.spacing(1),
    marginBottom: 50,
  },
  title: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  searchBox: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "white",
    width: "100%",
  },
  searchInput: {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: theme.spacing(6),
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
  margin: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  loading: {
    marginTop: theme.spacing(1),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  center: {
    textAlign: "center",
    display: "block",
    justifyContent: "center",
    alignItems: "center",
    margin: "auto",
  },
  dialogAppBar: {
    flexGrow: 1,
    marginLeft: theme.spacing(1),
  },
  dialogActions: {
    marginRight: theme.spacing(2),
    marginLeft: theme.spacing(2),
  },
  cardPadding: {
    padding: "0px 8px 0px 8px",
    borderRadius: 8,
  },
  cardActionMargin: {
    marginRight: theme.spacing(1),
    marginTop: theme.spacing(1),
  },
  cardContentPadding: {
    paddingTop: 0,
    cursor: "pointer",
  },
  textFieldMargin: {
    margin: theme.spacing(1),
  },
  masonaryGrid: {
    display: "flex",
    width: "auto",
  },
  masonaryGridColumn: {
    padding: "0 10px 0 10px",
    backgroundClip: "padding-box",
    "& > div": {
      margin: "10px 0 10px 0",
    },
  },
  noteCardPointer: {
    cursor: "pointer",
  },
  white: {
    color: "#FFFFFF",
  },
  grow: {
    flexGrow: 1,
  },
}));

export const NoteCardPlaceholder = styled(Paper)(({ theme }) => ({
  ...theme.typography.body1,
  color: theme.palette.text.secondary,
  boxShadow: "none",
  fontWeight: "bold",
  textAlign: "center",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
  margin: "auto",
  verticalAlign: "center",
  height: 100,
  border: "2px dashed rgb(189, 189, 189)",
  background: "#EEEEEE",
  cursor: "pointer",
}));
