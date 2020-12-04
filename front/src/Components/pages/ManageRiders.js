import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import axios from "axios";
import ManagedRiderCard from "../ManagedRiderCard.js";

const ManageRiders = () => {
  let history = useHistory();
  const [riders, setRiders] = useState([]);
  const [filter, setFilter] = useState("");
  const status = useSelector((state) => state.auth.user.status);

  const getRiders = () => {
    axios
      .get(`http://localhost:5000/api/admin/getAllRiders`) // tri: if date different from null pr avoir que les actifs
      .then((res) => {
        setRiders(res.data);
      })
      .catch((err) => console.log(err));
  };

  const deleteRider = (e) => {
    axios
      .delete(`http://localhost:5000/api/admin/deleteRider/${e}`)
      .then(() => getRiders())
      .catch((err) => console.log(err));
  };

  const editRider = (e) => {
    axios
      .put(`http://localhost:5000/api/admin/updateRider/${e._id}`, e)
      .then(() => getRiders())
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    if (status !== "Admin") {
      history.push("/");
    }
    getRiders();
  }, [history, status]);

  return (
    <div style={{ padding: 15 }}>
      <h1>Manage riders page</h1>
      <input
        type="text"
        onChange={(e) => setFilter(e.target.value)}
        placeholder="Search rider"
      ></input>
      {riders
        .filter(
          (el) =>
            el.riderFirstName
              .toLocaleLowerCase()
              .trim()
              .includes(filter.toLocaleLowerCase().trim()) ||
            el.riderLastName
              .toLocaleLowerCase()
              .trim()
              .includes(filter.toLocaleLowerCase().trim())
        )
        .map((rider) => (
          <ManagedRiderCard
            key={rider._id}
            riderAnnualFeeEndDate={rider.riderAnnualFeeEndDate}
            riderLessonsFeeEndDate={rider.riderLessonsFeeEndDate}
            riderFirstName={rider.riderFirstName}
            riderLastName={rider.riderLastName}
            riderTeacher={rider.riderTeacher}
            createdAt={rider.createdAt}
            updatedAt={rider.updatedAt}
            deleteRider={deleteRider}
            editRider={editRider}
            cardId={rider._id}
          />
        ))}
    </div>
  );
};

export default ManageRiders;
