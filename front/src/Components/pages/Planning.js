import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import axios from "axios";

const Planning = () => {
  const status = useSelector((state) => state.auth.user.status);
  const teacherName = useSelector((state) => state.auth.user.accountFirstName);
  const history = useHistory();
  const [planningDate, setPlanningDate] = useState(new Date());
  const [riders, setRiders] = useState([]);
  const [lessonSpace, setLessonSpace] = useState();
  const [lessonRiders, setLessonRiders] = useState();
  console.log(planningDate);

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
      getRiders(teacherName);
    } else {
      history.push("/");
    }
  }, [history, teacherName, status]);

  return (
    <div style={{ padding: 15 }}>
      <h2>Planning du :</h2>
      <input
        type="date"
        onChange={(e) => {
          setPlanningDate(new Date(e.target.value));
        }}
      ></input>

      {status === "Teacher" ? (
        <form>
          <p>
            Add lesson pas en modal, comme ça teacher peut recheck en cas de
            doute. Mapping LessonCard.js des séances du jour séléctionné. Si une
            séance X a été créé alors permettre sa modif que par son teacher. Et
            admin full CRUD. Teacher pas le droit de modif une séance
            passée(???)
          </p>
          <p>Add lesson:</p>
          <select onChange={(e) => setLessonSpace(e.target.value)}>
            <option value="grande">Grande</option>
            <option value="petite">Petite</option>
            <option value="balade">Balade</option>
          </select>

          <p>Time picker</p>
          <p>Add rider and his horse:</p>
          <select onChange={(e) => setLessonRiders(e.target.value)}>
            <option></option>
            {riders.map((rider) => (
              <option key={rider._id} value={rider.riderFirstName}>
                {rider.riderFirstName} {rider.riderLastName}
              </option>
            ))}
          </select>
        </form>
      ) : (
        ""
      )}
    </div>
  );
};

export default Planning;
