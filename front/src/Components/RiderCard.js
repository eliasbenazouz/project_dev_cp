import React, { useState, useEffect } from "react";

const RiderCard = ({
  teachers,
  riderFirstName,
  riderLastName,
  riderTeacher,
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
  const [selectRiderTeacher, setSelectRiderTeacher] = useState("Select:");

  const handleConfirm = () => {
    editRider({
      newFirstName,
      newLastName,
      selectRiderTeacher,
      _id: cardId,
    });
    editToggle();
  };

  const deleteToggle = () => {
    setDeleteModal(!deleteModal);
  };

  const editToggle = () => {
    setEditModal(!editModal);
  };

  useEffect(() => {
    setNewFirstName(riderFirstName);
    setNewLastName(riderLastName);
    setSelectRiderTeacher(riderTeacher);
  }, [riderFirstName, riderLastName, riderTeacher]);

  return (
    <div>
      <p>
        {riderFirstName} {riderLastName}
      </p>
      <p>Teacher: {riderTeacher}</p>
      {riderLessonsFeeEndDate && riderAnnualFeeEndDate ? (
        <div>
          <p
            style={{
              color:
                new Date(riderLessonsFeeEndDate).getTime() <
                new Date().getTime()
                  ? "red"
                  : "green",
            }}
          >
            Lessons' fee end date:{riderLessonsFeeEndDate}
          </p>
          <p
            style={{
              color:
                new Date(riderAnnualFeeEndDate).getTime() < new Date().getTime()
                  ? "red"
                  : "green",
            }}
          >
            Annual fee end date:{riderAnnualFeeEndDate}
          </p>
        </div>
      ) : (
        <p>Rider still not verified by admin.</p>
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
                name="newFirstName"
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
              <select onChange={(e) => setSelectRiderTeacher(e.target.value)}>
                <option defaultValue="">{selectRiderTeacher}</option>
                <option value="No teacher">No teacher</option>
                {teachers.map((teacher) => (
                  <option key={teacher._id} value={teacher.accountFirstName}>
                    {teacher.accountFirstName}
                  </option>
                ))}
              </select>
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

export default RiderCard;
