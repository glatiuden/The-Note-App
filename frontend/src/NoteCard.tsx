import React from "react";
import { useStore } from "../reducers/store";
import { formatDate } from "../utils";

import { Card, CardHeader, CardContent, IconButton, Typography } from "@material-ui/core";
import { DeleteOutlined as DeleteIcon, EditOutlined as EditIcon } from "@material-ui/icons";

const NoteCard = ({ note, onDeleteClick, onEditClick }) => {
  const [store, dispatch] = useStore();
  const { classes } = store;

  return (
    <Card className={classes.cardPadding} variant="outlined">
      <CardHeader
        title={
          <span
            className={classes.noteCardPointer}
            onClick={() => onEditClick(note._id)}
            onKeyDown={() => onEditClick(note._id)}
            aria-hidden="true"
          >
            {note.title}
          </span>
        }
        subheader={`Last updated ${formatDate(note.updated_at)}`}
        titleTypographyProps={{ variant: "h6" }}
        subheaderTypographyProps={{ variant: "caption" }}
        action={
          <div className={classes.cardActionMargin}>
            <IconButton size="small" onClick={() => onEditClick(note._id)}>
              <EditIcon />
            </IconButton>
            <IconButton size="small" onClick={() => onDeleteClick(note._id)}>
              <DeleteIcon />
            </IconButton>
          </div>
        }
      />
      <CardContent className={classes.cardContentPadding} onClick={() => onEditClick(note._id)}>
        <Typography variant="body2" color="textSecondary">
          {note.description}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default NoteCard;
