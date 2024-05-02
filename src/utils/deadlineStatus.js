import dayjs from "dayjs";

const DeadlineStatus = (datestr) => {
  const currentDate = dayjs();
  const dueDate = dayjs(datestr);
  const diffInDays = dueDate.diff(currentDate, "milliseconds");
  if (diffInDays <= 0) {
    return "task-expired";
  }
  if (diffInDays <= 24 * 60 * 60 * 1000) return "task-urgent";
  return "task-upcoming";
};
export default DeadlineStatus;
