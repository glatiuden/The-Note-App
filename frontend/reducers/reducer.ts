import _ from "lodash";
import { actions } from "./actions";

interface IAction {
  type: string;
  payload?: any;
}

export const noteReducer = (state, action: IAction) => {
  switch (action.type) {
    case actions.SET_NOTE:
      return {
        ...state,
        note: action.payload,
      };
    case actions.SET_NOTES:
      return {
        ...state,
        notes: action.payload,
      };
    case actions.SET_OPEN_DIALOG:
      const is_dialog_open = _.get(action.payload, "is_dialog_open", false);
      const note_id = _.get(action.payload, "note_id");
      const is_edit = !!note_id;
      return {
        ...state,
        is_dialog_open,
        is_edit,
        note_id,
      };
    case actions.SET_LOADING:
      return {
        ...state,
        is_loading: action.payload,
      };
    default:
      return state;
  }
};
