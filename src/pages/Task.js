import {
  addDoc,
  collection,
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore/lite";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PATHS from "../utils/constants";
import { DateToTimeStamp, TimestampToDate } from "../utils/convertDate";
import { db } from "../utils/firebaseConfig";
import { getLocalStorageItem } from "../utils/handleLocalStorage";

const Task = () => {
  const { id } = useParams();
  const userId = getLocalStorageItem("todouser").userId;
  const navigate = useNavigate();
  const userDocRef = doc(db, "user", userId);
  const taskRef = id ? doc(db, "task", id) : "";
  const [formData, setFormData] = useState({
    name: "",
    dueDate: {},
    user: userDocRef,
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      name: e.target.elements.name.value,
      dueDate: DateToTimeStamp(new Date(formData.dueDate)),
      user: userDocRef,
    };
    const isEmpty = !data.name || !data.dueDate.seconds;
    if (isEmpty) {
      alert("Vui lòng nhập đủ các trường");
      return;
    }
    if (id) {
      try {
        await updateDoc(taskRef, data);
        navigate(PATHS.home);
      } catch (error) {
        console.error("Error fetching data:", error.message);
        throw error;
      }
    } else {
      try {
        await addDoc(collection(db, "task"), data);
        navigate(PATHS.home);
      } catch (error) {
        console.error("Error fetching data:", error.message);
        throw error;
      }
    }
  };
  useEffect(() => {
    const getTask = async () => {
      if (id) {
        const docSnap = await getDoc(taskRef);
        if (docSnap.exists()) {
          const dueDate = TimestampToDate(docSnap.data().dueDate);
          setFormData({
            name: docSnap.data().name,
            dueDate,
          });
        } else {
          console.log("No such document!");
        }
      }
    };
    getTask();
  }, [id]);

  const handleCancel = () => {
    navigate(PATHS.home);
  };
  return (
    <div className="task-page">
      <h1 className="task-page__title">
        {id ? "Chỉnh sửa Task" : "Thêm Task"}
      </h1>
      <form className="task-form" onSubmit={handleSubmit}>
        <div className="form-content">
          <div className="form-content__field">
            <label for="name">Tên Task</label>
            <input
              id="name"
              className="form-content__inp"
              defaultValue={formData.name}
            />
          </div>
          <div className="form-content__field">
            <label htmlFor="dueDate">Ngày đến hạn</label>
            <input
              id="dueDate"
              type="datetime-local"
              className="form-content__inp"
              value={formData.dueDate}
              onChange={(e) =>
                setFormData({ ...formData, dueDate: e.target.value })
              }
            />
          </div>
          <div className="form-content__btn-container">
            <button className="btn btn--cancel" onClick={handleCancel}>
              Hủy
            </button>
            <button className="btn btn--add" type="submit">
              {id ? "Lưu" : "Thêm"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
export default Task;
