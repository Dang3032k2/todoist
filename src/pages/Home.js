import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TaskList from "../components/TaskList";

const Home = () => {
  const navigate = useNavigate();
  const isLogin = Boolean(localStorage.getItem("todouser"));
  useEffect(() => {
    if (!isLogin) {
      navigate("/login");
    }
  }, []);
  const handleAdd = () => {
    navigate("/newtask");
  };
  const handleLogout = () => {
    localStorage.removeItem("todouser");
    navigate("/login");
  };
  return (
    <div className="home-page">
      <div className="home-page__content">
        <h1 className="home-page__title">TODO LIST</h1>
        <div className="home-page__btn">
          <button className="btn btn--add" onClick={handleAdd}>
            + Thêm mới
          </button>
          <button className="btn btn--logout" onClick={handleLogout}>
            Đăng xuất
          </button>
        </div>

        <TaskList />
      </div>
    </div>
  );
};
export default Home;
