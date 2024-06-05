import { Navigate, Outlet } from "react-router-dom";
import PATHs from "../utils/constants";
import { getLocalStorageItem } from "../utils/handleLocalStorage";

const Protected = () => {
  const isAuthenticated = Boolean(getLocalStorageItem("todouser"));

  return isAuthenticated ? <Outlet /> : <Navigate to={PATHs.login} />;
};
export default Protected;
