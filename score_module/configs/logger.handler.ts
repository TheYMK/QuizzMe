import axios from "axios";

export const loggerHandler = async ({ message, level }) => {
  await axios.post("http://172.20.0.5:8083/logger/log", {
    message,
    level,
    module: "score",
  });
};
