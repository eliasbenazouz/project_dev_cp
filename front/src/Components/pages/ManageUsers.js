import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import axios from "axios";
import ManagedUserCard from "../ManagedUserCard.js";

const ManageUsers = () => {
  let history = useHistory();
  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState("");
  const status = useSelector((state) => state.auth.user.status);

  const getUsers = () => {
    axios
      .get(`http://localhost:5000/api/admin/getCustomers`) // Tri comptes zombies: if date création suppérieur à 2 semaines de jour actuel et 0 riders
      .then((res) => {
        setUsers(res.data);
      })
      .catch((err) => console.log(err));
  };

  const updateUserStatus = (e) => {
    axios
      .put(`http://localhost:5000/api/admin/updateUserStatus/${e._id}`, e)
      .then(() => getUsers())
      .catch((err) => console.log(err));
  };

  const deleteUser = (e) => {
    axios
      .delete(`http://localhost:5000/api/admin/deleteUser/${e}`)
      .then(() => getUsers())
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    if (status !== "Admin") {
      history.push("/");
    } else {
      getUsers();
    }
  }, [history, status]);

  return (
    <div style={{ padding: 15 }}>
      <h2>Manage users page</h2>
      <input
        type="text"
        onChange={(e) => setFilter(e.target.value)}
        placeholder="Search user"
      ></input>
      {users
        .filter(
          (el) =>
            el.accountFirstName
              .toLocaleLowerCase()
              .trim()
              .includes(filter.toLocaleLowerCase().trim()) ||
            el.accountLastName
              .toLocaleLowerCase()
              .trim()
              .includes(filter.toLocaleLowerCase().trim())
        )
        .map((user) => (
          <ManagedUserCard
            key={user._id}
            accountFirstName={user.accountFirstName}
            accountLastName={user.accountLastName}
            status={user.status}
            cardId={user._id}
            updateUserStatus={updateUserStatus}
            deleteUser={deleteUser}
          />
        ))}
    </div>
  );
};

export default ManageUsers;
