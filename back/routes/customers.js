import express from "express";
import Rider from "../models/Rider.js";
import User from "../models/User.js";

const customersRouter = express.Router();

customersRouter.get("/getRiders/:_id", async (req, res) => {
  const { _id } = req.params;
  Rider.find({ userAccountID: _id })
    .then((riders) => res.status(200).send(riders))
    .catch((err) => {
      console.log(err);
      res.status(500).send(err);
    });
});

customersRouter.get("/getTeachers/", async (req, res) => {
  User.find({ status: "Teacher" })
    .then((teachers) => res.status(200).send(teachers))
    .catch((err) => {
      console.log(err);
      res.status(500).send(err);
    });
});

customersRouter.post("/newRider/:_id", async (req, res) => {
  const {
    riderFirstName,
    riderLastName,
    riderTeacher,
    riderAnnualFeeEndDate,
    riderLessonsFeeEndDate,
  } = req.body;
  const { _id } = req.params;

  const newRider = new Rider({
    riderFirstName,
    riderLastName,
    riderTeacher,
    riderAnnualFeeEndDate,
    riderLessonsFeeEndDate,
  });
  const user = await User.findById(_id);

  newRider.userAccountID = user;

  await newRider
    .save()
    .then((data) => res.status(200).send(data))
    .catch((err) => res.status(500).send(err));
});

customersRouter.delete("/deleteRider/:_id", async (req, res) => {
  const { _id } = req.params;
  Rider.findOneAndDelete({ _id })
    .then((riders) => res.send(riders))
    .catch((err) => console.log(err));
});

customersRouter.put("/updateRider/:_id", async (req, res) => {
  const { _id } = req.params;
  const { newFirstName, newLastName, selectRiderTeacher } = req.body;

  Rider.findOneAndUpdate(
    { _id },
    {
      $set: {
        riderTeacher: selectRiderTeacher,
        riderFirstName: newFirstName,
        riderLastName: newLastName,
      },
    }
  )
    .then((rider) => res.send(rider))
    .catch((err) => console.log(err));
});

export { customersRouter };
