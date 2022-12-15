const winston = require("winston");

// Winston config

const loggerConfig = {
  level: "debug",
  format: winston.format.combine(
    winston.format.timestamp({
      format: "MMM-DD-YYYY HH:mm:ss",
    }),
    winston.format.printf(
      (info) =>
        `${[info.timestamp]}: ${info.level.toUpperCase()}: ${info.message}`
    )
  ),
  transports: [new winston.transports.File({ filename: "logs/app.log" })],
};

const logger = winston.createLogger(loggerConfig);

module.exports = logger;
