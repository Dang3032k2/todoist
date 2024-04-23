import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const isLogin = Boolean(localStorage.getItem("access_token"));
  useEffect(() => {
    if (!isLogin) {
      navigate("/login");
    }
  }, [isLogin, navigate]);

  return (
    <div>
      <p>This is Home</p>
    </div>
  );
};
export default Home;
