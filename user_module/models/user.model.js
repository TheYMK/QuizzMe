const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const { isEmail } = require("validator");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, `Veuillez entrer un nom d'utilisateur`],
      unique: true,
    },
    password: {
      type: String,
      required: [true, `Veuillez entrer un mot de passe`],
      minlength: [6, `Le mot de passe doit contenir au minimum 6 caractères`],
      validate: [
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]/,
        `Le mot de passe doit contenir au moins une majuscule, un caractère spécial et un nombre`,
      ],
    },
    email: {
      type: String,
      required: [true, `Veuillez entrer une adresse email`],
      unique: true,
      lowercase: true,
      validate: [isEmail, `Veuillez renseigner une addresse email valide`],
    },
    quizzs: [
      {
        type: mongoose.Schema.Types.ObjectId,
      },
    ],
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.statics.login = async function (email, password) {
  const user = await this.findOne(
    { email },
    {
      createdAt: 0,
      updatedAt: 0,
      __v: 0,
    }
  );
  if (user) {
    const auth = await bcrypt.compare(password, user.password);
    if (auth) {
      delete user._doc.password;
      return user;
    }
  }
  throw Error("unknow user");
};

const User = mongoose.model("user", userSchema);

module.exports = User;
