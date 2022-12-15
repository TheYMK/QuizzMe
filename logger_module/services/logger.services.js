const logger = require("../configs/logger");

// const logLevels = ['info', 'error', 'warn', 'http', 'verbose', 'debug', 'silly']

exports.log = async (body) => {
  const { message, module, level } = body;
  try {
    logger.log({ message: `[${module}_module] => ${message}`, level })
    return {
      success: true
    }
  } catch (err) {
    console.log(err)
    return {
      success: false
    }
  }
};