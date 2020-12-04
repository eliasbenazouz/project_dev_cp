import React, { useState, useEffect } from "react";

const ManagedHorseCard = ({
  horseName,
  horseStatus,
  privateHorsePensionEndDate,
  privateHorseAnnualFeeEndDate,
  deleteHorse,
  editHorse,
  editPublicHorse,
  horseId,
}) => {
  const [editModal, setEditModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [newHorseName, setNewHorseName] = useState("");
  const [newHorseStatus, setNewHorseStatus] = useState("");
  const [
    newPrivateHorsePensionEndDate,
    setNewPrivateHorsePensionEndDate,
  ] = useState();
  const [
    newPrivateHorseAnnualFeeEndDate,
    setNewPrivateHorseAnnualFeeEndDate,
  ] = useState();

  const handleConfirm = () => {
    if (newHorseStatus === "private" || newHorseStatus === "privateUsable") {
      editHorse({
        newHorseName,
        newHorseStatus,
        newPrivateHorsePensionEndDate,
        newPrivateHorseAnnualFeeEndDate,
        _id: horseId,
      });
    } else {
      console.log(newHorseStatus);
      console.log("2");
      editPublicHorse({
        newHorseName,
        newHorseStatus,
        _id: horseId,
      });
    }

    editToggle();
  };

  const deleteToggle = () => {
    setDeleteModal(!deleteModal);
  };

  const editToggle = () => {
    setEditModal(!editModal);
    setNewHorseName("");
    setNewHorseStatus("");
  };

  useEffect(() => {
    setNewHorseName(horseName);
    setNewHorseStatus(horseStatus);
    setNewPrivateHorsePensionEndDate(privateHorsePensionEndDate);
    setNewPrivateHorseAnnualFeeEndDate(privateHorseAnnualFeeEndDate);
  }, [
    editModal,
    horseName,
    horseStatus,
    privateHorsePensionEndDate,
    privateHorseAnnualFeeEndDate,
  ]);

  return (
    <div>
      <h3>{horseName}</h3>
      <p>{horseStatus}</p>
      {horseStatus === "private" || horseStatus === "privateUsable" ? (
        <div>
          <p
            style={{
              color:
                new Date(newPrivateHorsePensionEndDate).getTime() <
                new Date().getTime()
                  ? "red"
                  : "green",
            }}
          >
            Pension end date:{privateHorsePensionEndDate}
          </p>
          <p
            style={{
              color:
                new Date(newPrivateHorseAnnualFeeEndDate).getTime() <
                new Date().getTime()
                  ? "red"
                  : "green",
            }}
          >
            Annual fee end date:{privateHorseAnnualFeeEndDate}
          </p>
        </div>
      ) : (
        ""
      )}
      <button onClick={deleteToggle}>X</button>
      {!deleteModal ? (
        ""
      ) : (
        <div className="bg-modal">
          <div className="modal-contents">
            <div className="close" onClick={deleteToggle}>
              +
            </div>
            <p>Confirm deletion</p>
            <form>
              <button onClick={deleteToggle}>Cancel</button>
              <button
                type="button"
                onClick={() => {
                  deleteHorse(horseId);
                }}
              >
                Confirm
              </button>
            </form>
          </div>
        </div>
      )}
      <button onClick={editToggle}>Edit</button>
      {!editModal ? (
        ""
      ) : (
        <div className="bg-modal">
          <div className="modal-contents">
            <div className="close" onClick={editToggle}>
              +
            </div>
            <form>
              <input
                onChange={(e) => {
                  setNewHorseName(e.target.value);
                }}
                defaultValue={horseName}
                id="newHorseName"
                name="newHorseName"
                type="text"
                placeholder="New horse name"
              ></input>
              <select onChange={(e) => setNewHorseStatus(e.target.value)}>
                <option defaultValue="">{newHorseStatus}</option>
                <option value="publicActive">publicActive</option>
                <option value="publicInactive">publicInactive</option>
                <option value="private">private</option>
                <option value="privateUsable">privateUsable</option>
              </select>
              {newHorseStatus === "private" ||
              newHorseStatus === "privateUsable" ? (
                <div>
                  <input
                    onChange={(e) => {
                      setNewPrivateHorsePensionEndDate(
                        new Date(e.target.value)
                      );
                    }}
                    type="date"
                  ></input>
                  <input
                    onChange={(e) => {
                      setNewPrivateHorseAnnualFeeEndDate(
                        new Date(e.target.value)
                      );
                    }}
                    type="date"
                  ></input>
                </div>
              ) : (
                ""
              )}
              <button type="button" onClick={handleConfirm}>
                Change
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManagedHorseCard;
