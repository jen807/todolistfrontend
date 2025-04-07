import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import useUser from "./lib/useUser";
import UserProfile from "./pages/UserProfile";
import EditProfile from "./pages/EditProfile";
import SignUp from "./pages/SignUp";
import Detail from "./pages/Detail";
import { EditTodo } from "./pages/EditTodo";
import ChangePassword from "./pages/ChangePassword";

const Router = () => {
  const { isLoggedIn } = useUser();
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={isLoggedIn ? <Home /> : <Login />} />
        <Route path="/login" element={isLoggedIn ? <Home /> : <Login />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/profile/edit" element={<EditProfile />} />
        <Route path="/login/signup" element={<SignUp />} />
        <Route path="/detail/:id" element={<Detail />} />
        <Route path="/detail/:id/edit" element={<EditTodo />} />
        <Route path="/profile/changepassword" element={<ChangePassword />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
