import mongoose from "mongoose";
const Schema = mongoose.Schema;

const userSchema = Schema(
  {
    status: {
      type: String,
    },
    soloAccount: {
      type: Boolean,
      required: true,
    },
    accountFirstName: {
      type: String,
      required: true,
    },
    accountLastName: {
      type: String,
      required: true,
    },
    telephone: {
      type: Number,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
