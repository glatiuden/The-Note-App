import _ from "lodash";
import { Logger } from "winston";

import { ResponseCode } from "../../entities/interfaces/response-code";

import { IGetNoteById } from "../../use-cases/note/get-note-by-id";

export default function makeGetNoteController({ getNoteById, logger }: { getNoteById: IGetNoteById, logger: Logger }) {
  return async function getNoteController(httpRequest: Request & { context: { validated: { note_id: string } } }) {
    const headers = {
      "Content-Type": "application/json",
    };

    try {
      const { note_id }: { note_id: string } = _.get(httpRequest, "context.validated");
      const note = await getNoteById({ id: note_id });
      if (!note) {
        throw new Error(`Note by ${note_id} does not exists.`);
      }

      logger.verbose("Note retrieved", { note_id });
      return {
        headers,
        statusCode: ResponseCode.SUCCESS,
        body: {
          data: note,
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
