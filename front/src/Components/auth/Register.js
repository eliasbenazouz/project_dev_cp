import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { register } from "../../features/authSlice";
import "./Login.css";

const Register = () => {
  const dispatch = useDispatch();
  let history = useHistory();
  const [modal, setModal] = useState(false);
  const [soloAccount, setSoloAccount] = useState(true);
  const [accountFirstName, setAccountFirstName] = useState();
  const [accountLastName, setAccountLastName] = useState();
  const [telephone, setTelephone] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const handleConfirm = () => {
    dispatch(
      register({
        soloAccount: soloAccount,
        accountFirstName: accountFirstName,
        accountLastName: accountLastName,
        telephone: telephone,
        email: email,
        password: password,
      })
    );
    history.push("/customer-dashboard");
  };
  const toggle = () => setModal(!modal);

  return (
    <div>
      <button onClick={toggle}>Register</button>
      {!modal ? (
        ""
      ) : (
        <div className="bg-modal">
          <div className="modal-contents">
            <div className="close" onClick={toggle}>
              +
            </div>
            <form>
              <label>
                Solo
                <input
                  onClick={() => {
                    setSoloAccount(true);
                  }}
                  name="soloAccount"
                  type="radio"
                  defaultChecked
                ></input>
              </label>
              <label>
                Family
                <input
                  onChange={(e) => {
                    setSoloAccount(false);
                  }}
                  name="soloAccount"
                  type="radio"
                ></input>
              </label>
              <input
                onChange={(e) => {
                  setAccountFirstName(e.target.value);
                }}
                id="accountFirstName"
                name="accountFirstName"
                type="text"
                placeholder="First name"
              ></input>
              <input
                onChange={(e) => {
                  setAccountLastName(e.target.value);
                }}
                type="text"
                id="accountLastName"
                name="accountLastName"
                placeholder="Last name"
              ></input>
              <input
                onChange={(e) => {
                  setTelephone(e.target.value);
                }}
                type="number"
                id="telephone"
                name="telephone"
                placeholder="Telephone"
              ></input>
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
              <button
                type="button"
                onClick={() => {
                  handleConfirm();
                  toggle();
                }}
              >
                Register
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Register;
