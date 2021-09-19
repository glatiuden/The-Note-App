import _ from "lodash";
import { Logger } from "winston";

import { ResponseCode } from "../../entities/interfaces/response-code";

import { IHardDeleteNoteById } from "../../use-cases/note/hard-delete-note-by-id";

export default function makeHardDeleteNoteController({
  hardDeleteNoteById,
  logger
}: {
  hardDeleteNoteById: IHardDeleteNoteById;
  logger: Logger
}) {
  return async function hardDeleteNoteController(httpRequest: Request & { context: { validated: { note_id: string } } }) {
    const headers = {
      "Content-Type": "application/json",
    };

    try {
      const { note_id }: { note_id: string } = _.get(httpRequest, "context.validated");

      const is_deleted = await hardDeleteNoteById({ id: note_id });
      if (!is_deleted) {
        throw new Error(`Note by ${note_id} unable to delete.`);
      }

      logger.verbose("Note hard-deleted", { note_id: note_id });
      return {
        headers,
        statusCode: ResponseCode.SUCCESS,
        body: {
          is_deleted,
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
