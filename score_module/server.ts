import scoresRouter from "./routes/score.routes";
const express = require("express");
const morgan = require("morgan");
import { sequelize } from "./models/";
const cors = require("cors");

// Constants
const PORT = 8082;
const corsOptions = {
  origin: [
    "http://0.0.0.0:8080",
    "http://0.0.0.0:8081",
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
  console.log(err);
});

app.listen(PORT, () => {
  console.log("\x1b[33m%s\x1b[0m", `Server listen on port : ${PORT} 🚀`);
});
