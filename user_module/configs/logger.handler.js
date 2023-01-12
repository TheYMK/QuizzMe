const axios = require('axios');

const loggerHandler = async ({ message, level, remoteAddr = null }) => {
  await axios.post('http://172.20.0.5:8083/logger/log', {
    message,
    level,
    module: 'user',
    remoteAddr
  });
};

module.exports = loggerHandler;
