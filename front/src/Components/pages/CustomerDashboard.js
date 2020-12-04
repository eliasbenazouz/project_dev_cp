import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { useHistory } from "react-router-dom";
import RiderCard from "../RiderCard.js";

const CustomerDashboard = () => {
  let history = useHistory();
  const user = useSelector((state) => state.auth.user);
  const status = useSelector((state) => state.auth.user.status);
  const [riderFirstName, setRiderFirstName] = useState("");
  const [riderLastName, setRiderLastName] = useState("");
  const [riderTeacher, setRiderTeacher] = useState("No teacher");
  const [riders, setRiders] = useState([]);
  const [teachers, setTeachers] = useState([]);

  const getRiders = (e) => {
    axios
      .get(`http://localhost:5000/api/customers/getRiders/${e}`)
      .then((res) => {
        setRiders(res.data);
      })
      .catch((err) => console.log(err));
  };

  const getTeachers = () => {
    axios
      .get(`http://localhost:5000/api/customers/getTeachers`)
      .then((res) => {
        setTeachers(res.data);
      })
      .catch((err) => console.log(err));
  };

  const addRider = (e) => {
    axios
      .post(`http://localhost:5000/api/customers/newRider/${e.userId}`, e)
      .then(() => getRiders(user._id))
      .catch((err) => console.log(err));
  };

  const deleteRider = (e) => {
    axios
      .delete(`http://localhost:5000/api/customers/deleteRider/${e}`)
      .then(() => getRiders(user._id))
      .catch((err) => console.log(err));
  };

  const editRider = (e) => {
    axios
      .put(`http://localhost:5000/api/customers/updateRider/${e._id}`, e)
      .then(() => getRiders(user._id))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    if (status === "Teacher") {
      // Il faudra compléter ça pr palefrenier et autres nvx schemes
      history.push("/teacher-dashboard");
    } else if (status === "Admin") {
      history.push("/admin-dashboard");
    } else {
      getRiders(user._id);
      getTeachers();
    }
  }, [history, status, user._id]);

  return (
    <div style={{ padding: 15 }}>
      <h1>Dashboard</h1>
      <h2>Riders:</h2>
      {riders.map((rider, i) => {
        return (
          <RiderCard
            key={rider._id}
            teachers={teachers}
            riderFirstName={rider.riderFirstName}
            riderLastName={rider.riderLastName}
            riderTeacher={rider.riderTeacher}
            riderLessonsFeeEndDate={rider.riderLessonsFeeEndDate}
            riderAnnualFeeEndDate={rider.riderAnnualFeeEndDate}
            deleteRider={deleteRider}
            editRider={editRider}
            cardId={rider._id}
          />
        );
      })}
      <form>
        <input
          onChange={(e) => {
            setRiderFirstName(e.target.value);
          }}
          value={riderFirstName}
          id="riderFirstName"
          name="riderFirstName"
          type="text"
          placeholder="Rider First name"
        ></input>
        <input
          onChange={(e) => {
            setRiderLastName(e.target.value);
          }}
          value={riderLastName}
          id="riderLastName"
          name="riderLastName"
          type="text"
          placeholder="Rider Last name"
        ></input>
        <select onChange={(e) => setRiderTeacher(e.target.value)}>
          <option defaultValue="No teacher">No teacher</option>
          {teachers.map((teacher) => (
            <option key={teacher._id} value={teacher.accountFirstName}>
              {teacher.accountFirstName}
            </option>
          ))}
        </select>
        <button
          onClick={(e) => {
            e.preventDefault();
            if (!riderFirstName || !riderLastName || !riderTeacher) return;
            addRider({
              riderFirstName: riderFirstName,
              riderLastName: riderLastName,
              riderTeacher: riderTeacher,
              userId: user._id,
            });
            setRiderFirstName("");
            setRiderLastName("");
          }}
        >
          Add rider
        </button>
      </form>
    </div>
  );
};

export default CustomerDashboard;
