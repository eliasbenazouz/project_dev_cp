import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { logout } from "../../features/authSlice";

const Logout = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const handleLogout = () => {
    dispatch(logout());
    history.push("/");
  };

  return (
    <div>
      <form>
        <button type="button" onClick={handleLogout}>
          Logout
        </button>
      </form>
    </div>
  );
};

export default Logout;
