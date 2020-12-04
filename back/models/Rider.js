import mongoose from "mongoose";
const Schema = mongoose.Schema;

const riderSchema = new Schema(
  {
    riderFirstName: {
      type: String,
      required: true,
    },
    riderLastName: {
      type: String,
      required: true,
    },
    riderTeacher: {
      type: String,
      required: false,
    },
    riderAnnualFeeEndDate: {
      type: Date,
    },
    riderLessonsFeeEndDate: {
      type: Date,
    },
    userAccountID: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Rider", riderSchema);
