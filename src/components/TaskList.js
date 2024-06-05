import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  where,
} from "firebase/firestore/lite";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { TimestampToDate } from "../utils/convertDate";
import { db } from "../utils/firebaseConfig";
import DeadlineStatus from "../utils/deadlineStatus";
import ConfirmModal from "./ConfirmModal";
import { getLocalStorageItem } from "../utils/handleLocalStorage";

const TaskList = () => {
  const user = getLocalStorageItem("todouser");
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);
  const [isShowConfirm, setIsShowConfirm] = useState(false);
  const [deletedTaskID, setIsDeletedTaskID] = useState(null);
  const isEmpty = tasks.length === 0;
  const getTasks = useCallback(async () => {
    const data = [];
    const q = query(
      collection(db, "task"),
      where("user", "==", doc(db, `user/${user.userId}`))
    );
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      data.push({ id: doc.id, data: doc.data() });
    });
    setTasks(data);
  }, []);
  useEffect(() => {
    getTasks();
  }, []);

  const handleEdit = (id) => {
    navigate(`/edittask/${id}`);
  };
  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "task", id));
      getTasks();
      setIsShowConfirm(false);
    } catch (error) {
      throw error;
    }
  };
  const handleDeleteProcess = (taskId) => {
    setIsShowConfirm(true);
    setIsDeletedTaskID(taskId);
  };
  return (
    <div className="task-table">
      {isShowConfirm && (
        <ConfirmModal
          onConfirm={() => handleDelete(deletedTaskID)}
          onCancel={() => setIsShowConfirm(false)}
        />
      )}
      {isEmpty && (
        <div className="empty-list">
          <p>Bạn chưa có task nào</p>
          <img
            src="../../assets/empty-image.png"
            alt="empty task list"
            className="empty-list__img"
          />
        </div>
      )}

      {!isEmpty && (
        <ul>
          {tasks.map((task) => {
            const taskData = task.data;
            const taskDueDate = TimestampToDate(taskData.dueDate, "view");
            const deadlineStatus = DeadlineStatus(taskDueDate);
            return (
              <li key={task.id} className="task-table__row">
                <div className="task-table__row-text">
                  <div>{taskData.name}</div>
                  <div className={`${deadlineStatus}`}>{taskDueDate}</div>
                </div>

                <div className="task-table__row-btn">
                  <button onClick={() => handleEdit(task.id)}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="22px"
                      height="22px"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fill="#55c6f7"
                        d="M5 21q-.825 0-1.412-.587T3 19V5q0-.825.588-1.412T5 3h8.925l-2 2H5v14h14v-6.95l2-2V19q0 .825-.587 1.413T19 21zm4-6v-4.25l9.175-9.175q.3-.3.675-.45t.75-.15q.4 0 .763.15t.662.45L22.425 3q.275.3.425.663T23 4.4q0 .375-.137.738t-.438.662L13.25 15zM21.025 4.4l-1.4-1.4zM11 13h1.4l5.8-5.8l-.7-.7l-.725-.7L11 11.575zm6.5-6.5l-.725-.7zl.7.7z"
                      ></path>
                    </svg>
                  </button>
                  <button onClick={() => handleDeleteProcess(task.id)}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24px"
                      height="24px"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fill="#f52424"
                        d="M7 21q-.825 0-1.412-.587T5 19V6H4V4h5V3h6v1h5v2h-1v13q0 .825-.587 1.413T17 21zm2-4h2V8H9zm4 0h2V8h-2z"
                      ></path>
                    </svg>
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};
export default TaskList;
