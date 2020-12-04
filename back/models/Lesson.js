import mongoose from "mongoose";
const Schema = mongoose.Schema;

const coupleSchema = Schema({
  riderId: { type: Schema.Types.ObjectId, ref: "Rider", required: true },
  horse: { type: Schema.Types.ObjectId, ref: "Horse", required: true },
});

const lessonSchema = Schema(
  {
    lessonTeacher: {
      type: Schema.Types.ObjectId,
      ref: "Teacher",
      required: true,
    },
    lessonSpace: {
      type: String, // grande/petite/extérieur
      required: true,
    },
    lessonStarts: {
      type: Date,
      required: true,
    },
    lessonCouples: [coupleSchema],
  },
  { timestamps: true }
);

export default mongoose.model("Lesson", lessonSchema);
