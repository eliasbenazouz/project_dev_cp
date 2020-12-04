import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import axios from "axios";

const TeacherManageRiders = () => {
  let history = useHistory();
  const [filter, setFilter] = useState("");
  const status = useSelector((state) => state.auth.user.status);
  const teacherName = useSelector((state) => state.auth.user.accountFirstName);
  const [riders, setRiders] = useState([]);

  const getRiders = (e) => {
    axios
      .get(`http://localhost:5000/api/teachers/getRiders/${e}`)
      .then((res) => {
        setRiders(res.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    if (status === "Teacher") {
      console.log("");
    } else {
      history.push("/");
    }
    getRiders(teacherName);
  }, [history, teacherName, status]);

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
          <div key={rider._id}>
            <h3>
              {rider.riderFirstName} {rider.riderLastName}
            </h3>
            {rider.riderLessonsFeeEndDate && rider.riderAnnualFeeEndDate ? (
              <div>
                <p
                  style={{
                    color:
                      new Date(rider.riderLessonsFeeEndDate).getTime() <
                      new Date().getTime()
                        ? "red"
                        : "green",
                  }}
                >
                  Lessons' fee end date:{rider.riderLessonsFeeEndDate}
                </p>
                <p
                  style={{
                    color:
                      new Date(rider.riderAnnualFeeEndDate).getTime() <
                      new Date().getTime()
                        ? "red"
                        : "green",
                  }}
                >
                  Annual fee end date:{rider.riderAnnualFeeEndDate}
                </p>
              </div>
            ) : (
              <p>Rider still not verified by admin.</p>
            )}
          </div>
        ))}
    </div>
  );
};

export default TeacherManageRiders;
