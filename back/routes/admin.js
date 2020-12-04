import express from "express";
import Rider from "../models/Rider.js";
import User from "../models/User.js";
import Horse from "../models/Horse.js";

const adminRouter = express.Router();

// USERS:

adminRouter.get("/getCustomers", async (req, res) => {
  User.find({
    $or: [
      { status: "Pending" },
      { status: "RiderAccount" },
      { status: "OwnerAccount" },
    ],
  })
    .then((users) => res.status(200).send(users))
    .catch((err) => {
      console.log(err);
      res.status(500).send(err);
    });
});

adminRouter.get("/userRiders/:_id", async (req, res) => {
  const { _id } = req.params;
  Rider.find({ userAccountID: _id })
    .then((riders) => res.status(200).send(riders))
    .catch((err) => {
      console.log(err);
      res.status(500).send(err);
    });
});

adminRouter.put("/updateUserStatus/:_id", async (req, res) => {
  const { _id } = req.params;
  const { status } = req.body;
  User.findOneAndUpdate(
    { _id },
    {
      $set: {
        status: status,
      },
    }
  )
    .then((user) => res.send(user))
    .catch((err) => console.log(err));
});

adminRouter.delete("/deleteUser/:_id", async (req, res) => {
  const { _id } = req.params;
  await Rider.remove({ userAccountID: _id });
  User.findOneAndDelete({ _id })
    .then((riders) => res.send(riders))
    .catch((err) => console.log(err));
});

// RIDERS:

adminRouter.get("/getAllRiders", async (req, res) => {
  Rider.find()
    .then((riders) => res.status(200).send(riders))
    .catch((err) => {
      console.log(err);
      res.status(500).send(err);
    });
});

adminRouter.delete("/deleteRider/:_id", async (req, res) => {
  const { _id } = req.params;
  Rider.findOneAndDelete({ _id })
    .then((riders) => res.send(riders))
    .catch((err) => console.log(err));
});

adminRouter.put("/updateRider/:_id", async (req, res) => {
  const { _id } = req.params;
  const {
    isValidated,
    newFirstName,
    newLastName,
    newLessonsFeeEndDate,
    newAnnualFeeEndDate,
  } = req.body;

  Rider.findOneAndUpdate(
    { _id },
    {
      $set: {
        validated: isValidated,
        riderFirstName: newFirstName,
        riderLastName: newLastName,
        riderLessonsFeeEndDate: newLessonsFeeEndDate,
        riderAnnualFeeEndDate: newAnnualFeeEndDate,
      },
    }
  )
    .then((rider) => res.send(rider))
    .catch((err) => console.log(err));
});

// HORSES:

adminRouter.post("/addHorse", async (req, res) => {
  const {
    horseStatus,
    horseName,
    privateHorsePensionEndDate,
    privateHorseAnnualFeeEndDate,
  } = req.body;
  const newHorse = new Horse({
    horseStatus,
    horseName,
    privateHorsePensionEndDate,
    privateHorseAnnualFeeEndDate,
  });
  await newHorse
    .save()
    .then((data) => res.status(200).send(data))
    .catch((err) => res.status(500).send(err));
});

adminRouter.get("/getAllHorses", async (req, res) => {
  Horse.find()
    .then((horses) => res.status(200).send(horses))
    .catch((err) => {
      console.log(err);
      res.status(500).send(err);
    });
});

adminRouter.delete("/deleteHorse/:_id", async (req, res) => {
  const { _id } = req.params;
  Horse.findOneAndDelete({ _id })
    .then((horses) => res.send(horses))
    .catch((err) => console.log(err));
});

adminRouter.put("/updateHorse/:_id", async (req, res) => {
  const { _id } = req.params;
  const {
    newHorseName,
    newHorseStatus,
    newPrivateHorsePensionEndDate,
    newPrivateHorseAnnualFeeEndDate,
  } = req.body;

  Horse.findOneAndUpdate(
    { _id },
    {
      $set: {
        horseName: newHorseName,
        horseStatus: newHorseStatus,
        privateHorsePensionEndDate: newPrivateHorsePensionEndDate,
        privateHorseAnnualFeeEndDate: newPrivateHorseAnnualFeeEndDate,
      },
    }
  )
    .then((horse) => res.send(horse))
    .catch((err) => console.log(err));
});

adminRouter.put("/updatePublicHorse/:_id", async (req, res) => {
  const { _id } = req.params;
  const { newHorseName, newHorseStatus } = req.body;

  Horse.findOneAndUpdate(
    { _id },
    {
      $set: {
        horseName: newHorseName,
        horseStatus: newHorseStatus,
      },
      $unset: {
        privateHorsePensionEndDate: "",
        privateHorseAnnualFeeEndDate: "",
      },
    }
  )
    .then((horse) => res.send(horse))
    .catch((err) => console.log(err));
});

export { adminRouter };
