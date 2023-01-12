"use strict";
const soap = require("soap");
const express = require("express");
const tipsRouter = require("./routes/tips.routes");
const cors = require("cors");
const fs = require("fs");
const morgan = require("morgan");
const { serviceObject } = require("./configs/wsdlConfig");

const PORT = 8086;

const corsOptions = {
  origin: [
    "http://0.0.0.0:8080",
    "http://0.0.0.0:8081",
    "http://0.0.0.0:8082",
    "http://0.0.0.0:8083",
    "http://localhost:3001",
  ],
  credentials: true,
};

// load the WSDL file
var xml = fs.readFileSync("service.wsdl", "utf8");

// App
const app = express();
app.use(express.json());
app.use(morgan("dev"));
app.use("/tips", tipsRouter);
app.use(cors(corsOptions));

app.listen(PORT, function () {
  console.log("Listening on port " + PORT);
  var wsdl_path = "/wsdl";
  soap.listen(app, wsdl_path, serviceObject, xml);
  console.log(
    "Check http://localhost:" +
      PORT +
      wsdl_path +
      "?wsdl to see if the service is working"
  );
});
