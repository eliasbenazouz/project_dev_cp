import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useHistory, Link } from "react-router-dom";
import axios from "axios";

const AdminDashboard = () => {
  let history = useHistory();
  const [riders, setRiders] = useState([]);
  const [users, setUsers] = useState([]);
  const [horses, setHorses] = useState([]);
  const status = useSelector((state) => state.auth.user.status);

  let validatedRiders = riders.filter(
    (rider) => rider.riderLessonsFeeEndDate !== undefined
  );
  let outdatedLessonsFeeRiders = riders.filter(
    (rider) =>
      new Date(rider.riderLessonsFeeEndDate).getTime() < new Date().getTime()
  );
  let outdatedAnnualFeeRiders = riders.filter(
    (rider) =>
      new Date(rider.riderAnnualFeeEndDate).getTime() < new Date().getTime()
  );
  let privateHorses = horses.filter(
    (horse) =>
      horse.horseStatus === "private" || horse.horseStatus === "privateUsable"
  );
  let outdatedPrivateHorsePensionEndDate = horses.filter(
    (horse) =>
      new Date(horse.privateHorsePensionEndDate).getTime() <
      new Date().getTime()
  );
  let outdatedPrivateHorseAnnualFeeEndDate = horses.filter(
    (horse) =>
      new Date(horse.privateHorseAnnualFeeEndDate).getTime() <
      new Date().getTime()
  );

  const getRiders = () => {
    axios
      .get(`http://localhost:5000/api/admin/getAllRiders`)
      .then((res) => {
        setRiders(res.data);
      })
      .catch((err) => console.log(err));
  };

  const getUsers = () => {
    axios
      .get(`http://localhost:5000/api/admin/getCustomers`)
      .then((res) => {
        setUsers(res.data);
      })
      .catch((err) => console.log(err));
  };

  const getHorses = () => {
    axios
      .get("http://localhost:5000/api/admin/getAllHorses")
      .then((res) => {
        setHorses(res.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    if (status !== "Admin") {
      history.push("/");
    }
    getRiders();
    getUsers();
    getHorses();
  }, [history, status]);

  return (
    <div style={{ padding: 15 }}>
      <h1>Admin dashboard</h1>
      <h2>Number of riders</h2>
      <p>
        <b>{validatedRiders.length}</b> verified riders of which{" "}
        <b
          style={{
            color: outdatedLessonsFeeRiders.length === 0 ? "green" : "red",
          }}
        >
          {outdatedLessonsFeeRiders.length}
        </b>{" "}
        must pay their lessons fee and{" "}
        <b
          style={{
            color: outdatedAnnualFeeRiders.length === 0 ? "green" : "red",
          }}
        >
          {outdatedAnnualFeeRiders.length}
        </b>{" "}
        must pay their annual fee.
      </p>
      <p>
        <b
          style={{
            color:
              riders.length - validatedRiders.length === 0 ? "green" : "red",
          }}
        >
          {riders.length - validatedRiders.length}
        </b>{" "}
        rider(s) to be verified.
      </p>
      <Link style={{ color: "black" }} to="/admin-dashboard/manage-riders">
        Manage riders
      </Link>
      <h2>Number of horses</h2>
      <p>
        {horses.length} horses including {horses.length - privateHorses.length}{" "}
        of our horses and {privateHorses.length} private horses (
        <b
          style={{
            color:
              outdatedPrivateHorsePensionEndDate.length === 0 ? "green" : "red",
          }}
        >
          {outdatedPrivateHorsePensionEndDate.length}
        </b>{" "}
        must pay their pension and{" "}
        <b
          style={{
            color:
              outdatedPrivateHorseAnnualFeeEndDate.length === 0
                ? "green"
                : "red",
          }}
        >
          {outdatedPrivateHorseAnnualFeeEndDate.length}
        </b>{" "}
        must pay their annual fee).
      </p>
      <Link style={{ color: "black" }} to="/admin-dashboard/manage-horses">
        Manage horses
      </Link>
      <h2>Number of customer accounts</h2>
      <p>{users.length} users</p>
      <Link style={{ color: "black" }} to="/admin-dashboard/manage-users">
        Manage users
      </Link>
    </div>
  );
};

export default AdminDashboard;
