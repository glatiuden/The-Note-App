import _ from "lodash";
import { Request } from "express";
import { Logger } from "winston";

import { ResponseCode } from "../../entities/interfaces/response-code";

import INote from "../../entities/interfaces/note";
import { IUpdateNote } from "../../use-cases/note/update-note";

export default function makeUpdateNoteController({
  updateNote,
  logger
}: {
  updateNote: IUpdateNote;
  logger: Logger
}) {
  return async function updateNoteController(httpRequest: Request & { context: { validated: { noteDetails: INote } } }) {
    const headers = {
      "Content-Type": "application/json",
    };

    try {
      const noteDetails: INote = _.get(httpRequest, "context.validated");
      const { _id: note_id } = noteDetails; // the note's ID

      const updated_note = await updateNote({ noteDetails });
      if (!updated_note) {
        throw new Error(`Note by ${note_id} unable to update.`);
      }

      logger.verbose("Note updated", { note_id });
      return {
        headers,
        statusCode: ResponseCode.SUCCESS,
        body: {
          data: updated_note,
        },
      };
    } catch (err: any) {
      logger.error(err.message);
      return {
        headers,
        statusCode: ResponseCode.ERROR,
        body: {
          errors: err.message
        },
      };
    }
  };
}
