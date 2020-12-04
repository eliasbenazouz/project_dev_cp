// import mongoose from 'mongoose'
// const Schema = mongoose.Schema

// Dans son espace => Historique de ses séances en faisant un find avec filtre teacher et filtre période voulue

// teacher.accountStudents.push(newRider); Pr ajouter dans array students du teacher en question à chaque création d'un rider

const teacherSchema = new Schema(
  {
    teacherFirstName: {
      type: String,
      required: false, // tester puis à la fin mettre ces 3 en required: true
    },
    teacherLastName: {
      type: String,
      required: false,
    },
    riderTeacher: {
      type: String,
      required: false,
    },
    teacherStudents: [
      { type: Schema.Types.ObjectId, ref: "Rider", required: false },
    ],
  },
  { timestamps: true }
);
