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
import PATHS from "../utils/constants";
const Register = () => {
  const navigate = useNavigate();
  const validatePassword = (password) => {
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+}{:;'?/>.<,])(?=.*[0-9]).{8,}$/;
    return passwordRegex.test(password);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      name: e.target.elements.name.value,
      email: e.target.elements.email.value,
      password: e.target.elements.password.value,
    };
    const isMissing = !formData.name || !formData.email || !formData.password;
    if (isMissing) {
      alert("Vui lòng nhập đầy đủ thông tin!");
      return;
    }
    if (!validatePassword(formData.password)) {
      alert(
        "Mật khẩu phải chứa tối thiểu 8 ký tự, gồm ít nhất: 1 chữ Hoa, 1 chữ thường, 1 số, và 1 ký tự đặc biệt."
      );
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
    navigate(PATHS.login);
  };
  return (
    <div className="login-page">
      <form className="login-page__form" onSubmit={handleSubmit}>
        <div className="form-content">
          <div className="form-content__field">
            <label for="name">Tên</label>
            <input id="name" className="form-content__inp" />
          </div>
          <div className="form-content__field">
            <label for="email">Email</label>
            <input id="email" type="email" className="form-content__inp" />
          </div>
          <div className="form-content__field">
            <label for="password">Mật khẩu</label>
            <input
              id="password"
              type="password"
              className="form-content__inp"
            />
          </div>
          <button className="btn btn--login" type="submit">
            ĐĂNG KÝ
          </button>
          <span>Đã có tài khoản? </span>
          <Link to={PATHS.login}>Đăng nhập</Link>
        </div>
      </form>
    </div>
  );
};
export default Register;
