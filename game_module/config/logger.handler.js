const axios = require("axios");

const loggerHandler = async ({ message, level, remoteAddr }) => {
  await axios.post("http://172.20.0.5:8083/logger/log", {
    message,
    level,
    module: "game",
    remoteAddr,
  });
};

module.exports = loggerHandler;
