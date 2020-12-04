import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory, Link } from "react-router-dom";
import axios from "axios";

const TeacherDashboard = () => {
  let history = useHistory();
  const status = useSelector((state) => state.auth.user.status);
  const teacherName = useSelector((state) => state.auth.user.accountFirstName);
  const [riders, setRiders] = useState([]);

  let validatedRiders = riders.filter(
    (rider) => rider.riderLessonsFeeEndDate !== undefined
  );
  let outdatedLessonsFeeRiders = riders.filter(
    (el) => new Date(el.riderLessonsFeeEndDate).getTime() < new Date().getTime()
  );
  let outdatedAnnualFeeRiders = riders.filter(
    (el) => new Date(el.riderAnnualFeeEndDate).getTime() < new Date().getTime()
  );

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
      <h1>Teacher dashboard</h1>
      <p>Your next lesson is on Tuesday 27th at 5pm. See details.</p>
      <Link style={{ color: "black" }} to="/teacher-dashboard/manage-riders">
        See riders
      </Link>
      {validatedRiders.length === 1 ? (
        <p>You have {validatedRiders.length} student. </p>
      ) : (
        <p>You have {validatedRiders.length} students. </p>
      )}
      <p>
        Of which {outdatedLessonsFeeRiders.length} must pay their lessons fee
        and {outdatedAnnualFeeRiders.length} must pay their annual fee. See
        details.
      </p>
      <Link style={{ color: "black" }} to="/planning">
        Planning
      </Link>
    </div>
  );
};

export default TeacherDashboard;
