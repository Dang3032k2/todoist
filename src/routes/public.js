import { Navigate, Outlet } from "react-router-dom";
import PATHs from "../utils/constants";
import { getLocalStorageItem } from "../utils/handleLocalStorage";

const Public = () => {
  const isAuthenticated = Boolean(getLocalStorageItem("todouser"));
  console.log("public", isAuthenticated);
  return isAuthenticated ? <Navigate to={PATHs.home} /> : <Outlet />;
};
export default Public;
