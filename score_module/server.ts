import scoresRouter from "./routes/score.routes";
const express = require("express");
const morgan = require("morgan");
import { sequelize } from "./models/";
import { loggerHandler } from "./configs/logger.handler";
const cors = require("cors");

// Constants
const PORT = 8082;
const corsOptions = {
  origin: [
    "http://0.0.0.0:8080",
    "http://0.0.0.0:8081",
    "http://0.0.0.0:8083",
    "http://localhost:3001",
  ],
  credentials: true,
};

// App
const app = express();
app.use(express.json());
app.use(morgan("dev"));
app.use("/scores", scoresRouter);
app.use(cors(corsOptions));

/* CONNECT TO DATABASE */
sequelize.sync().catch((err) => {
  loggerHandler({
    message: "Database connection failure",
    level: "error",
  }).then(() => console.log(err.message));
});

app.listen(PORT, () => {
  loggerHandler({
    message: `Server listen on port : ${PORT}`,
    level: "info",
  }).then(() =>
    console.log("\x1b[33m%s\x1b[0m", `Server listen on port : ${PORT} 🚀`)
  );
});
