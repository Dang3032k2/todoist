import dayjs from "dayjs";
import { Timestamp } from "firebase/firestore/lite";

const TimestampToDate = ({ seconds, nanoseconds }, type) => {
  const timestamp = new Timestamp(seconds, nanoseconds);
  const date = timestamp.toDate();
  const formattedDate =
    type === "view"
      ? dayjs(date).format("YYYY-MM-DD, HH:mm:ss")
      : dayjs(date).format("YYYY-MM-DDTHH:mm:ss");
  return formattedDate;
};
const DateToTimeStamp = (date) => {
  const timestamp = Timestamp.fromDate(date);
  return timestamp;
};
export { TimestampToDate, DateToTimeStamp };
