import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Task from "../pages/Task";
import Protected from "./protected";
import Public from "./public";
import PATHS from "../utils/constants";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path={PATHS.home}>
      <Route element={<Public />}>
        <Route path={PATHS.login} element={<Login />} />
        <Route path={PATHS.register} element={<Register />} />
      </Route>

      <Route element={<Protected />}>
        <Route index element={<Home />} />
        <Route path={PATHS.addTask} element={<Task />} />
        <Route path={PATHS.editTask} element={<Task />} />
      </Route>
    </Route>
  )
);

const Router = () => {
  return <RouterProvider router={router} />;
};
export default Router;
