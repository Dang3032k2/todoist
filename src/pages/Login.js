import { collection, getDocs, query, where } from "firebase/firestore/lite";
import { Link, useNavigate } from "react-router-dom";
import PATHS from "../utils/constants";
import { db } from "../utils/firebaseConfig";
import { setLocalStorageItem } from "../utils/handleLocalStorage";
const Login = () => {
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target.elements.email.value;
    const password = e.target.elements.password.value;
    const q = query(
      collection(db, "user"),
      where("email", "==", email),
      where("password", "==", password)
    );

    const querySnapshot = await getDocs(q);
    if (querySnapshot.size) {
      setLocalStorageItem("todouser", {
        userId: querySnapshot.docs[0].id,
      });

      navigate(PATHS.home);
    } else {
      alert("Sai tài khoản hoặc mật khẩu");
    }
  };

  return (
    <div className="login-page">
      <form className="login-page__form" onSubmit={handleSubmit}>
        <div className="form-content">
          <div className="form-content__field">
            <label for="email">Email</label>
            <input id="email" type="email" className="form-content__inp" />
          </div>
          <div className="form-content__field">
            <label for="password">Password</label>
            <input
              id="password"
              type="password"
              className="form-content__inp"
            />
          </div>
          <button className="btn btn--login" type="submit">
            ĐĂNG NHẬP
          </button>
          <span>Chưa có tài khoản? </span>
          <Link to={PATHS.register}>Đăng ký</Link>
        </div>
      </form>
    </div>
  );
};
export default Login;
