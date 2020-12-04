import React, { useState, useEffect } from "react";

const ManagedRiderCard = ({
  riderFirstName,
  riderLastName,
  riderTeacher,
  createdAt,
  updatedAt,
  riderAnnualFeeEndDate,
  riderLessonsFeeEndDate,
  deleteRider,
  editRider,
  cardId,
}) => {
  const [editModal, setEditModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [newFirstName, setNewFirstName] = useState("");
  const [newLastName, setNewLastName] = useState("");
  const [newAnnualFeeEndDate, setNewAnnualFeeEndDate] = useState();
  const [newLessonsFeeEndDate, setNewLessonsFeeEndDate] = useState();

  const handleConfirm = () => {
    editRider({
      newFirstName,
      newLastName,
      newLessonsFeeEndDate,
      newAnnualFeeEndDate,
      _id: cardId,
    });
    editToggle();
  };

  const deleteToggle = () => {
    setDeleteModal(!deleteModal);
  };

  const editToggle = () => {
    setEditModal(!editModal);
    setNewFirstName("");
    setNewLastName("");
  };

  useEffect(() => {
    setNewFirstName(riderFirstName);
    setNewLastName(riderLastName);
    setNewLessonsFeeEndDate(riderLessonsFeeEndDate);
    setNewAnnualFeeEndDate(riderAnnualFeeEndDate);
  }, [
    editModal,
    riderFirstName,
    riderLastName,
    riderLessonsFeeEndDate,
    riderAnnualFeeEndDate,
  ]);

  return (
    <div>
      <h3>
        {riderFirstName} {riderLastName}
      </h3>
      <p>Teacher: {riderTeacher}</p>
      {riderLessonsFeeEndDate !== undefined ? (
        <p
          style={{
            color:
              new Date(newLessonsFeeEndDate).getTime() < new Date().getTime()
                ? "red"
                : "green",
          }}
        >
          Lessons' fee end date:{riderLessonsFeeEndDate}
        </p>
      ) : (
        ""
      )}
      {riderAnnualFeeEndDate !== undefined ? (
        <p
          style={{
            color:
              new Date(newAnnualFeeEndDate).getTime() < new Date().getTime()
                ? "red"
                : "green",
          }}
        >
          Annual fee end date:{riderAnnualFeeEndDate}
        </p>
      ) : (
        ""
      )}
      <p>Created: {createdAt}</p>
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
                  deleteRider(cardId);
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
                  setNewFirstName(e.target.value);
                }}
                defaultValue={riderFirstName}
                id="newFirstName"
                name="riderFirstName"
                type="text"
                placeholder="New first name"
              ></input>
              <input
                onChange={(e) => {
                  setNewLastName(e.target.value);
                }}
                defaultValue={riderLastName}
                type="text"
                id="newLastName"
                name="newLastName"
                placeholder="New last name"
              ></input>
              <input
                onChange={(e) => {
                  setNewLessonsFeeEndDate(new Date(e.target.value));
                }}
                type="date"
              ></input>
              <input
                onChange={(e) => {
                  setNewAnnualFeeEndDate(new Date(e.target.value));
                }}
                type="date"
              ></input>
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

export default ManagedRiderCard;
