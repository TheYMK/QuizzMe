const express = require("express");
const mongoose = require("mongoose");
const usersRouter = require("./routes/user.routes");
const morgan = require("morgan");
const cors = require("cors");

// Constants
const PORT = 8080;
const corsOptions = {
  origin: [
    "http://0.0.0.0:8081",
    "http://0.0.0.0:8082",
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

const dbURI =
  process.env.DB_URI ||
  "mongodb+srv://tp_final_username:tp_final_password@cluster.3udzt.mongodb.net/cluster?retryWrites=true&w=majority";
mongoose
  .connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () =>
      console.log("\x1b[33m%s\x1b[0m", `Server listen on port : ${PORT} 🚀`)
    );
  })
  .catch((err) => console.log(err));
