import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/root/fragments/header/Header";
import Home from "./components/root/home/Home";
import SignUp from "./components/root/users/signUp/SignUp";
import Login from "./components/root/users/login/Login";
import UserHome from "./components/root/users/UsersHome";
import ProtectedRoutesGuest from "./components/protectedRoutes/ProtectedRoutesGuest";
import ProtectedRoutesUser from "./components/protectedRoutes/ProtectedRoutesUser";
import ProtectedRoutesAdmin from "./components/protectedRoutes/ProtectedRoutesAdmin";
import Users from "./components/root/users/user/Users";
import AdminHome from "./components/root/users/AdminHome";
import Articles from "./components/root/users/user/Articles";

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route element={<ProtectedRoutesGuest />}>
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
          </Route>
          <Route element={<ProtectedRoutesUser />}>
            <Route path="/user-home" element={<UserHome />} />
          </Route>
            <Route path="/articles" element={<Articles />} />
          <Route element={<ProtectedRoutesAdmin />}>
             <Route path="/admin-home" element={<AdminHome />} />
             <Route path="/users" element={<Users />} />>
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
