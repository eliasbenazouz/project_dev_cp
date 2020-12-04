import express from "express";
// import Lesson from "../models/Lesson.js";
import Rider from "../models/Rider.js";

const teachersRouter = express.Router();

teachersRouter.get("/getRiders/:teacher", async (req, res) => {
  const { teacher } = req.params;
  Rider.find({ riderTeacher: teacher })
    .then((students) => res.status(200).send(students))
    .catch((err) => {
      console.log(err);
      res.status(500).send(err);
    });
});

// teachersRouter.post("/newLesson/:_id", async (req, res) => {
//   const {
//     riderFirstName,
//     riderLastName,
//     riderTeacher,
//     riderAnnualFeeEndDate,
//     riderLessonsFeeEndDate,
//   } = req.body;
//   const { _id } = req.params;

//   const newLesson = new Lesson({
//     lessonTeacher: _id,
//     riderLastName,
//     riderTeacher,
//     riderAnnualFeeEndDate,
//     riderLessonsFeeEndDate,
//   });
//   const user = await User.findById(_id);

//   newRider.userAccountID = user;

//   await newLesson
//     .save()
//     .then((data) => res.status(200).send(data))
//     .catch((err) => res.status(500).send(err));
// });

export { teachersRouter };
