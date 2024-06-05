import { useNavigate } from "react-router-dom";
import TaskList from "../components/TaskList";
import PATHS from "../utils/constants";
import { removeLocalStorageItem } from "../utils/handleLocalStorage";

const Home = () => {
  const navigate = useNavigate();
  const handleAdd = () => {
    navigate(PATHS.addTask);
  };
  const handleLogout = () => {
    removeLocalStorageItem("todouser");
    navigate(PATHS.login);
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
