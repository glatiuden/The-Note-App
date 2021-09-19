import _ from "lodash";
import { Logger } from "winston";

import { ResponseCode } from "../../entities/interfaces/response-code";

import { IDeleteNoteById } from "../../use-cases/note/delete-note-by-id";

export default function makeDeleteNoteController({ deleteNoteById, logger }: { deleteNoteById: IDeleteNoteById; logger: Logger }) {
  return async function deleteNoteController(httpRequest: Request & { context: { validated: { note_id: string } } }) {
    const headers = {
      "Content-Type": "application/json",
    };

    try {
      const { note_id }: { note_id: string } = _.get(httpRequest, "context.validated");
      const deleted_note = await deleteNoteById({ id: note_id });
      if (!deleted_note) {
        throw new Error(`Note by ${note_id} unable to delete.`);
      }

      logger.verbose("Note soft-deleted", { note_id });
      return {
        headers,
        statusCode: ResponseCode.SUCCESS,
        body: {
          is_deleted: true,
          data: deleted_note,
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
