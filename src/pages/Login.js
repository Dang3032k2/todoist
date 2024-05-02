import { useState } from "react";
import { db } from "../utils/firebaseConfig";
import { collection, getDocs, query, where } from "firebase/firestore/lite";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const handleChangeForm = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const q = query(
      collection(db, "user"),
      where("email", "==", formData.email),
      where("password", "==", formData.password)
    );

    const querySnapshot = await getDocs(q);
    if (querySnapshot.size) {
      localStorage.setItem(
        "todouser",
        JSON.stringify({ userId: querySnapshot.docs[0].id })
      );
    } else {
      alert("Sai tài khoản hoặc mật khẩu");
    }
    navigate("/");
  };

  return (
    <div className="login-page">
      <form className="login-page__form" onSubmit={handleSubmit}>
        <div className="form-content">
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
            <label for="password">Password</label>
            <input
              id="password"
              type="password"
              className="form-content__inp"
              value={formData.password}
              onChange={handleChangeForm}
            />
          </div>
          <button className="btn btn--login" type="submit">
            ĐĂNG NHẬP
          </button>
        </div>
      </form>
    </div>
  );
};
export default Login;
