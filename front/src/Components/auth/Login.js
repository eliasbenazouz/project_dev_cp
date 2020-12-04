import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { login } from "../../features/authSlice";
import "./Login.css";

const Login = () => {
  const dispatch = useDispatch();
  let history = useHistory();
  const [modal, setModal] = useState(false);
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const handleConfirm = () => {
    dispatch(login({ email: email, password: password }));
    history.push("/customer-dashboard");
    toggle();
  };
  const toggle = () => setModal(!modal);

  return (
    <div>
      <button onClick={toggle}>Login</button>
      {!modal ? (
        ""
      ) : (
        <div className="bg-modal">
          <div className="modal-contents">
            <div className="close" onClick={toggle}>
              +
            </div>
            <form>
              <input
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                id="email"
                name="email"
                type="text"
                placeholder="E-mail"
              ></input>
              <input
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                type="password"
                id="password"
                name="password"
                placeholder="Password"
              ></input>
              <button type="button" onClick={handleConfirm}>
                Login
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
