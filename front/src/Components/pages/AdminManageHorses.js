import axios from "axios";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import ManagedHorseCard from "../ManagedHorseCard.js";

const AdminManageHorses = () => {
  const status = useSelector((state) => state.auth.user.status);
  const history = useHistory();
  const [horses, setHorses] = useState([]);
  const [horseName, setHorseName] = useState("");
  const [horseStatus, setHorseStatus] = useState("");
  const [
    privateHorsePensionEndDate,
    setPrivateHorsePensionEndDate,
  ] = useState();
  const [
    privateHorseAnnualFeeEndDate,
    setPrivateHorseAnnualFeeEndDate,
  ] = useState();

  const getHorses = () => {
    axios
      .get("http://localhost:5000/api/admin/getAllHorses")
      .then((res) => {
        setHorses(res.data);
      })
      .catch((err) => console.log(err));
  };

  const addHorse = (e) => {
    axios
      .post(`http://localhost:5000/api/admin/addHorse`, e)
      .then(() => getHorses())
      .catch((err) => console.log(err));
  };

  const deleteHorse = (e) => {
    axios
      .delete(`http://localhost:5000/api/admin/deleteHorse/${e}`)
      .then(() => getHorses())
      .catch((err) => console.log(err));
  };

  const editHorse = (e) => {
    axios
      .put(`http://localhost:5000/api/admin/updateHorse/${e._id}`, e)
      .then(() => getHorses())
      .catch((err) => console.log(err));
  };

  const editPublicHorse = (e) => {
    axios
      .put(`http://localhost:5000/api/admin/updatePublicHorse/${e._id}`, e)
      .then(() => getHorses())
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    if (status !== "Admin") {
      history.push("/");
    }
    setHorseStatus("publicActive");
    getHorses();
  }, [history, status]);

  return (
    <div style={{ padding: 15 }}>
      <h2>Manage horses</h2>
      <form>
        <input
          onChange={(e) => {
            setHorseName(e.target.value);
          }}
          value={horseName}
          type="text"
          placeholder="Horse name"
        ></input>
        <select onChange={(e) => setHorseStatus(e.target.value)}>
          <option value="publicActive">publicActive</option>
          <option value="publicInactive">publicInactive</option>
          <option value="private">private</option>
          <option value="privateUsable">privateUsable</option>
        </select>
        {horseStatus === "private" || horseStatus === "privateUsable" ? (
          <div>
            <input
              onChange={(e) => {
                setPrivateHorsePensionEndDate(new Date(e.target.value));
              }}
              type="date"
            ></input>
            <input
              onChange={(e) => {
                setPrivateHorseAnnualFeeEndDate(new Date(e.target.value));
              }}
              type="date"
            ></input>
          </div>
        ) : (
          ""
        )}
        <button
          onClick={(e) => {
            e.preventDefault();
            if (!horseName || !horseStatus) return;
            addHorse({
              horseName,
              horseStatus,
              privateHorsePensionEndDate,
              privateHorseAnnualFeeEndDate,
            });
            setHorseName("");
            setPrivateHorseAnnualFeeEndDate();
            setPrivateHorsePensionEndDate();
          }}
        >
          Add horse
        </button>
      </form>
      {horses.map((horse) => (
        <ManagedHorseCard
          key={horse._id}
          horseName={horse.horseName}
          horseStatus={horse.horseStatus}
          privateHorsePensionEndDate={horse.privateHorsePensionEndDate}
          privateHorseAnnualFeeEndDate={horse.privateHorseAnnualFeeEndDate}
          horseId={horse._id}
          deleteHorse={deleteHorse}
          editHorse={editHorse}
          editPublicHorse={editPublicHorse}
        />
      ))}
    </div>
  );
};

export default AdminManageHorses;
