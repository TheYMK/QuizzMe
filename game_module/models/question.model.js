const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, `Un title est requis`],
    },
    choice1: {
      type: String,
      required: [true, `Un choice1 est requis`],
    },
    choice2: {
      type: String,
      required: [true, `Un choice2 est requis`],
    },
    choice3: {
      type: String,
    },
    choice4: {
      type: String,
    },
    answer: {
      type: String,
      required: [true, `Une answer est requise`],
    },
  },
  {
    timestamps: true,
  }
);

questionSchema.pre("validate", function (next) {
  if (
    this.choice1 === this.answer ||
    this.choice2 === this.answer ||
    this.choice3 === this.answer ||
    this.choice4 === this.answer
  ) {
    next();
  } else {
    next(new Error("La answer ne correspond à aucun choix"));
  }
});

const Question = mongoose.model("question", questionSchema);

module.exports = Question;
