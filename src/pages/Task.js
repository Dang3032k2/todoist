import {
  addDoc,
  collection,
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore/lite";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { db } from "../utils/firebaseConfig";
import { DateToTimeStamp, TimestampToDate } from "../utils/convertDate";

const Task = () => {
  const { id } = useParams();
  const userId = JSON.parse(localStorage.getItem("todouser")).userId;
  const navigate = useNavigate();
  const userDocRef = doc(db, "user", userId);
  const taskRef = id ? doc(db, "task", id) : "";
  const [formData, setFormData] = useState({
    name: "",
    dueDate: {},
    user: userDocRef,
  });
  const isEmpty = !formData.name || !formData.dueDate.seconds;
  const handleChangeName = (e) => {
    setFormData({ ...formData, name: e.target.value });
  };
  const handleChangeDueDate = (e) => {
    const dueDate = DateToTimeStamp(new Date(e.target.value));
    setFormData({ ...formData, dueDate: dueDate });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isEmpty) {
      alert("Vui lòng nhập đủ các trường");
      return;
    }
    if (id) {
      try {
        await updateDoc(taskRef, formData);
        navigate("/");
      } catch (error) {
        console.error("Error fetching data:", error.message);
        throw error;
      }
    } else {
      try {
        await addDoc(collection(db, "task"), formData);
        navigate("/");
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
          const data = {
            name: docSnap.data().name,
            dueDate: docSnap.data().dueDate,
          };
          setFormData(data);
        } else {
          console.log("No such document!");
        }
      }
    };
    getTask();
  }, [id]);
  const handleCancel = () => {
    navigate("/");
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
              value={formData.name}
              onChange={handleChangeName}
            />
          </div>
          <div className="form-content__field">
            <label for="dueDate">Ngày đến hạn</label>
            <input
              id="dueDate"
              type="datetime-local"
              className="form-content__inp"
              value={TimestampToDate(formData.dueDate)}
              onChange={handleChangeDueDate}
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
