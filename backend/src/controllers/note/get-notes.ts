import _ from "lodash";
import { Logger } from "winston";

import { ResponseCode } from "../../entities/interfaces/response-code";

import { IGetNotes } from "../../use-cases/note/get-notes";

export default function makeGetNotesController({ getNotes, logger }: { getNotes: IGetNotes; logger: Logger }) {
  return async function getNotesController(httpRequest: Request) {
    const headers = {
      "Content-Type": "application/json",
    };

    try {
      const { query }: { query: string } = _.get(httpRequest, "context.validated");
      const notes = await getNotes({ query });

      logger.verbose("Notes retrieved", { notes_count: notes.length });
      return {
        headers,
        statusCode: ResponseCode.SUCCESS,
        body: {
          data: notes,
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
