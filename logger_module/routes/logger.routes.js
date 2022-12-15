const { Router } = require("express");
const loggerRouter = Router();
const loggerServices = require("../services/logger.services");

loggerRouter.post("/log", async (req, res) => {
  try {
    res.status(200).send(await loggerServices.log(req.body));
  } catch (err) {
    res.status(500).send({ error: err?.response?.message });
  }
});

module.exports = loggerRouter;
