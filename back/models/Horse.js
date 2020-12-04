import mongoose from "mongoose";
const Schema = mongoose.Schema;

const horseSchema = new Schema(
  {
    horseStatus: {
      type: String,
      required: true,
    },
    horseName: {
      type: String,
      required: true,
    },
    privateHorsePensionEndDate: {
      type: Date,
    },
    privateHorseAnnualFeeEndDate: {
      type: Date,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Horse", horseSchema);
