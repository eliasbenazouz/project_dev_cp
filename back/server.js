import dotenv from "dotenv";
dotenv.config({ path: "./config/.env" });
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import { authRouter } from "./routes/auth.js";
import { customersRouter } from "./routes/customers.js";
import { adminRouter } from "./routes/admin.js";
import { teachersRouter } from "./routes/teachers.js";

//App config
const app = express();
const port = process.env.PORT || 5000;

//Middlewares
app.use(express.json());
app.use(cors());

//DB config
const mongoURI = process.env.mongo_URI;
mongoose.connect(mongoURI, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

mongoose.connection.once("open", () => {
  console.log("DB connected");
});

//API routes

app.use("/api/auth", authRouter);

app.use("/api/customers", customersRouter);

app.use("/api/admin", adminRouter);

app.use("/api/teachers", teachersRouter);

//Listening
app.listen(port, () => console.log(`Listening on localhost:${port}`));
