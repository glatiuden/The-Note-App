import _ from "lodash";
import { Logger } from "winston";

import { ResponseCode } from "../../entities/interfaces/response-code";

import INote from "../../entities/interfaces/note";
import { ICreateNote } from "../../use-cases/note/create-note";

export default function makeCreateNoteController({ createNote, logger }: { createNote: ICreateNote; logger: Logger }) {
  return async function createNoteController(httpRequest: Request & { context: { validated: Partial<INote> } }) {
    const headers = {
      "Content-Type": "application/json",
    };

    try {
      const noteDetails: INote = _.get(httpRequest, "context.validated");
      const created_note = await createNote({ noteDetails });
      if (!created_note) {
        throw new Error(`Note was not created.`);
      }

      logger.verbose("Note created", { note_id: created_note._id });
      return {
        headers,
        statusCode: ResponseCode.SUCCESS,
        body: {
          data: created_note,
        },
      };
    } catch (err: any) {
      logger.error(err.message);
      return {
        headers,
        statusCode: ResponseCode.ERROR,
        body: {
          errors: err.message,
        },
      };
    }
  };
}
