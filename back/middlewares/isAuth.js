import dotenv from "dotenv";
dotenv.config({ path: "./config/.env" });
import jwt from "jsonwebtoken";
import Users from "../models/User.js";

const isAuth = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    if (!token) {
      return res.status(400).send({ msg: "Unauthorized" });
    }
    const decoded = await jwt.verify(token, process.env.secretOrKey);
    const user = await Users.findById(decoded._id).select("-password");
    if (!user) {
      return res.status(400).send({ msg: "Unauthorized" });
    }
    req.user = user;
    next();
  } catch (error) {
    return res.status(500).send({ msg: "Unauthorized" });
  }
};

export { isAuth };
