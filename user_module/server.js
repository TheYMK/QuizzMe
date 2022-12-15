const express = require("express");
const mongoose = require("mongoose");
const usersRouter = require("./routes/user.routes");
const morgan = require("morgan");
const cors = require("cors");
const loggerHandler = require("./configs/logger.handler");

// Constants
const PORT = 8080;
const corsOptions = {
  origin: [
    "http://0.0.0.0:8081",
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
app.use("/users", usersRouter);
app.use(cors(corsOptions));

// Capture 500 errors
const dbURI =
  process.env.DB_URI ||
  "mongodb+srv://tp_final_username:tp_final_password@cluster.3udzt.mongodb.net/cluster?retryWrites=true&w=majority";
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
