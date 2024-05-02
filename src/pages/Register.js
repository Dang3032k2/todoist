import { useState } from "react";
import { db } from "../utils/firebaseConfig";
import {
  addDoc,
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore/lite";
import { Link, useNavigate } from "react-router-dom";
const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const isMissing = !formData.name || !formData.email || !formData.password;
  const handleChangeForm = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isMissing) {
      alert("Vui lòng nhập đầy đủ thông tin!");
      return;
    }
    const q = query(
      collection(db, "user"),
      where("email", "==", formData.email)
    );

    const querySnapshot = await getDocs(q);
    if (querySnapshot.size) {
      alert(
        "Email đã tồn tại! Vui lòng sử dụng email khác hoặc chuyển đến đăng nhập"
      );
      return;
    }
    await addDoc(collection(db, "user"), formData);
    navigate("/login");
  };

  return (
    <div className="login-page">
      <form className="login-page__form" onSubmit={handleSubmit}>
        <div className="form-content">
          <div className="form-content__field">
            <label for="name">Tên</label>
            <input
              id="name"
              className="form-content__inp"
              value={formData.name}
              onChange={handleChangeForm}
            />
          </div>
          <div className="form-content__field">
            <label for="email">Email</label>
            <input
              id="email"
              className="form-content__inp"
              value={formData.email}
              onChange={handleChangeForm}
            />
          </div>
          <div className="form-content__field">
            <label for="password">Mật khẩu</label>
            <input
              id="password"
              type="password"
              className="form-content__inp"
              value={formData.password}
              onChange={handleChangeForm}
            />
          </div>
          <button className="btn btn--login" type="submit">
            ĐĂNG KÝ
          </button>
          <span>Đã có tài khoản? </span>
          <Link to={"/login"}>Đăng nhập</Link>
        </div>
      </form>
    </div>
  );
};
export default Register;
