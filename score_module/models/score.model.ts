// /models/book.ts
import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from ".";

interface ScoreAttributes {
  id?: string;
  grade: string;
  goodAnswers: string;
  badAnswers: string;
  userId: string;
  quizzId: string;
}

interface ScoreInputAttributes
  extends Optional<ScoreAttributes, "id" | "grade"> {}

interface ScoreInstance
  extends Model<ScoreAttributes, ScoreInputAttributes>,
    ScoreAttributes {
  createdAt?: Date;
  updatedAt?: Date;
}

const Score = sequelize.define<ScoreInstance>(
  "Score",
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      unique: true,
      defaultValue: DataTypes.UUIDV4,
    },
    grade: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    goodAnswers: {
      allowNull: false,
      type: DataTypes.TEXT,
      get: function () {
        return JSON.parse(this.getDataValue("goodAnswers"));
      },
      set: function (val) {
        return this.setDataValue("goodAnswers", JSON.stringify(val));
      },
    },
    badAnswers: {
      allowNull: false,
      type: DataTypes.TEXT,
      get: function () {
        return JSON.parse(this.getDataValue("badAnswers"));
      },
      set: function (val) {
        return this.setDataValue("badAnswers", JSON.stringify(val));
      },
    },
    userId: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    quizzId: {
      allowNull: false,
      type: DataTypes.STRING,
    },
  },
  {
    tableName: "scores",
  }
);

export { Score, ScoreAttributes, ScoreInputAttributes };
