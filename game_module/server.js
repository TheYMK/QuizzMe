const express = require("express");
const mongoose = require("mongoose");
const quizzRouter = require("./routes/quizz.routes");
const morgan = require("morgan");
const Fixtures = require("node-mongodb-fixtures");
const fixtures = new Fixtures({ dir: "./fixtures", mute: false });
const cors = require("cors");
const loggerHandler = require("./config/logger.handler");

// Constants
const PORT = 8081;
const corsOptions = {
  origin: [
    "http://0.0.0.0:8080",
    "http://0.0.0.0:8082",
    "http://0.0.0.0:8083",
    "http://localhost:3001",
  ],
  credentials: true,
};

// App
const app = express();
app.use(express.json());
app.use(morgan("dev"));
app.use("/quizz", quizzRouter);
app.use(cors(corsOptions));

const dbURI =
  process.env.DB_URI ||
  "mongodb+srv://tp_final_username:tp_final_password@cluster.rg1v5.mongodb.net/cluster?retryWrites=true&w=majority";

/* fixtures
  .connect(dbURI)
  .then(() => fixtures.unload())
  .then(() => fixtures.load())
  .then(() => fixtures.disconnect()); */

mongoose
  .connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => {
      loggerHandler({
        message: `Server listen on port : ${PORT}`,
        level: "info",
      }).then(() =>
        console.log("\x1b[33m%s\x1b[0m", `Server listen on port : ${PORT} 🚀`)
      );
    });
  })
  .catch((err) => {
    loggerHandler({
      message: "Database connection failure",
      level: "error",
    }).then(() => console.log(err.message));
  });
