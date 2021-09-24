import moment from "moment";

/**
 * @description format the date // default: "DD MMMM YYYY, hh:mm"
 */
export function formatDate(date: Date, format?: string) {
  if (format) {
    return moment(date).format(format);
  } else {
    return moment(date).fromNow();
  }
}
