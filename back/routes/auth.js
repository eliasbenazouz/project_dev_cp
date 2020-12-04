import dotenv from "dotenv";
dotenv.config({ path: "./config/.env" });
import express from "express";
import bcrypt from "bcrypt";
import {
  validator,
  registerRules,
  loginRules,
} from "../middlewares/bodyValidator.js";
import jwt from "jsonwebtoken";
import { isAuth } from "../middlewares/isAuth.js";
import User from "../models/User.js";
import Rider from "../models/Rider.js";

const authRouter = express.Router();

authRouter.post("/register", registerRules(), validator, async (req, res) => {
  const {
    soloAccount,
    accountFirstName,
    accountLastName,
    telephone,
    email,
    password,
  } = req.body;
  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).send({ msg: "User already exists" });
    }
    user = new User({
      status: "Pending",
      soloAccount,
      accountFirstName,
      accountLastName,
      telephone,
      email,
      password,
    });

    const salt = 10;
    const hashedPassword = await bcrypt.hash(password, salt);

    user.password = hashedPassword;

    await user.save();

    if (soloAccount) {
      await Rider.create({
        riderFirstName: accountFirstName,
        riderLastName: accountLastName,
        riderTeacher: "",
        userAccountID: user._id,
      });
    }

    const payload = { _id: user._id };

    const token = await jwt.sign(payload, process.env.secretOrKey);

    res.status(200).send({ msg: "Register success", user, token });
  } catch (error) {
    res.status(500).send({ msg: "Server error" });
  }
});

authRouter.post("/login", loginRules(), validator, async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).send({ msg: "Bad credentials" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).send({ msg: "Bad credentials" });
    }
    const payload = { _id: user._id };

    const token = await jwt.sign(payload, process.env.secretOrKey);
    res.send({ msg: "Login success", user, token });
  } catch (error) {
    res.status(500).send({ msg: "Server error" });
  }
});

authRouter.get("/current", isAuth, (req, res) => {
  res.status(200).send({ user: req.user });
});

export { authRouter };
