const logger = require("../configs/logger");
const axios = require("axios");
// const logLevels = ['info', 'error', 'warn', 'http', 'verbose', 'debug', 'silly']

exports.log = async (body) => {
  const { message, module, level, remoteAddr } = body;

  try {
    const locationInfo = await axios.get(
      `http://ip-api.com/json/${remoteAddr}?fields=status,country,city`
    );
    logger.log({
      message: `{ clientLocation: ${
        locationInfo.data.status === "success"
          ? `${locationInfo.data.country} - (${locationInfo.data.city})`
          : "Unknown"
      }, module: ${module}, message: ${message}}`,
      level,
    });
    return {
      success: true,
    };
  } catch (err) {
    console.log(err);
    return {
      success: false,
    };
  }
};
