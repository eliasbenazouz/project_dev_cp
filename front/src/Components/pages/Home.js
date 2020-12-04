import React from "react";
import "./Home.css";
import LocalFloristIcon from "@material-ui/icons/LocalFlorist";
import RecordVoiceOverIcon from "@material-ui/icons/RecordVoiceOver";
import ScheduleIcon from "@material-ui/icons/Schedule";

const Home = () => {
  return (
    <div className="home">
      <div className="home__banner">
        <h2 className="float__h1">Passion & Adventure</h2>
      </div>
      <div className="home__qualities">
        <div className="home__qualities__element">
          <LocalFloristIcon fontSize="large" />
          <p>Eco friendly</p>
        </div>
        <div className="home__qualities__element">
          <RecordVoiceOverIcon fontSize="large" />
          <p>Lessons in French, English and Arabic</p>
        </div>
        <div className="home__qualities__element">
          <ScheduleIcon fontSize="large" />
          <p>Flexible schedule</p>
        </div>
      </div>
      <div className="home__infos">
        <div className="home__infos__text">
          <i>
            "Since 2008, we have taught more than 1000 students how to
            horse-back ride. We offer lessons for all ages and levels. Whether
            you are a competitor or just an occasional rider looking to enjoy a
            ride on the beach. Our team will help you get the level you want
            while having a great time!"
          </i>
        </div>
        <div className="home__infos__picture">
          <img alt="cavaliers" src="/cavaliers.jpg"></img>
        </div>
      </div>
      <div className="home__footer">
        <div>
          <h3>Contact</h3>
          <p>+216 25 198 564</p>
          <p>ecuries@ecuries.com</p>
        </div>
      </div>
    </div>
  );
};

export default Home;
