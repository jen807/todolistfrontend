import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import useUser from "./lib/useUser";
import UserProfile from "./pages/UserProfile";
import EditProfile from "./pages/EditProfile";

const Router = () => {
  const { isLoggedIn } = useUser();
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={isLoggedIn ? <Home /> : <Login />} />
        <Route path="/login" element={isLoggedIn ? <Home /> : <Login />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/profile/edit" element={<EditProfile />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
