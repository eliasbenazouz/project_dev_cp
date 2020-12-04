import React, { useState, useEffect } from "react";
import axios from "axios";

const ManagedUserCard = ({
  accountFirstName,
  accountLastName,
  status,
  cardId,
  updateUserStatus,
  deleteUser,
}) => {
  const [deleteModal, setDeleteModal] = useState(false);
  const [newStatus, setNewStatus] = useState();
  const [userRiders, setUserRiders] = useState([]);

  const getUserRiders = (e) => {
    axios
      .get(`http://localhost:5000/api/admin/userRiders/${e}`)
      .then((res) => {
        setUserRiders(res.data);
      })
      .catch((err) => console.log(err));
  };

  const handleStatusEdit = (e) => {
    updateUserStatus({ status: e, _id: cardId });
  };

  const deleteToggle = () => {
    setDeleteModal(!deleteModal);
  };

  useEffect(() => {
    setNewStatus(status);
    getUserRiders(cardId);
  }, [status, cardId]);

  return (
    <div>
      <h3>
        {accountFirstName} {accountLastName}
      </h3>
      <p>Account riders:</p>
      {userRiders.map((rider) => (
        <li
          style={{
            color: rider.riderLessonsFeeEndDate === undefined ? "red" : "green",
          }}
          key={rider._id}
        >
          {rider.riderFirstName} {rider.riderLastName}
        </li>
      ))}
      <form>
        <select
          onChange={(e) => {
            setNewStatus(e.target.value);
            handleStatusEdit(e.target.value);
            console.log(cardId);
          }}
        >
          <option defaultValue="">{newStatus}</option>
          <option value="RiderAccount">Rider account</option>
          <option value="OwnerAccount">Owner account</option>
        </select>
      </form>
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
                  deleteUser(cardId);
                }}
              >
                Confirm
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
export default ManagedUserCard;
