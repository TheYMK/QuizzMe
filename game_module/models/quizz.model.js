const mongoose = require("mongoose");

const quizzSchema = new mongoose.Schema(
  {
    label: {
      type: String,
      required: [true, `Un label est requis`],
    },
    questions: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Question",
      },
    ],
    difficulty: {
      type: Number,
      required: [true, `La difficulté est requise`],
    },
  },
  {
    timestamps: true,
  }
);

const Quizz = mongoose.model("quizz", quizzSchema);

module.exports = Quizz;
