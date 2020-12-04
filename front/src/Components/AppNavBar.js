import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Login from "./auth/Login.js";
import Logout from "./auth/Logout";
import Register from "./auth/Register.js";
import "./AppNavBar.css";

const AppNavBar = () => {
  const isAuth = useSelector((state) => state.auth.isAuth);
  return (
    <div className="appNavBar">
      <Link className="home-link" to="/">
        <h2 className="float__h2">Les Ecuries</h2>
      </Link>
      {!isAuth ? (
        <div className="auth">
          <Login />
          <Register />
        </div>
      ) : (
        <div>
          <Logout />
        </div>
      )}
    </div>
  );
};

export default AppNavBar;
