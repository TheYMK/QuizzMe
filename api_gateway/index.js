const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const PORT_API = 3001;
const cookieParser = require("cookie-parser");
const amqp = require("amqplib/callback_api");
const rateLimit = require("express-rate-limit");

/* ONLY ACCEPT Request*/
let corsOptions = {
  origin: ["http://localhost:3000"],
  credentials: true,
};

/* SETUP APP MIDDLEWARE */
const app = express();
const limiter = rateLimit({
  windowMs: 5 * 60 * 1000, // 5 minutes
  max: 100, // Limit each IP to 100 requests per `window` (here, per 5 minutes)
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors(corsOptions));
app.use(morgan("dev"));
app.use(cookieParser());
app.use((req, res, next) => {
  req.body.remoteAddr = req.socket.remoteAddress;
  next();
});
app.use(limiter);

/* IMPORT ROUTES */
require("./routes/api.routes.user")(app);
require("./routes/api.routes.game")(app);
require("./routes/api.routes.score")(app);
require("./routes/api.routes.tips")(app);

// Si aucune route n'a été trouvée
app.get("/.*/", function (req, res) {
  res.writeHead(404);
  res.end("Erreur 404 : URL " + req.url + " inconnue !");
});

/* APP LISTEN ON */
app.listen(PORT_API, () => {
  console.log(
    "\x1b[33m%s\x1b[0m",
    `Server API Gateway is running on port ${PORT_API} ✔`
  );
});
