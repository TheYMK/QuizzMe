const { Router } = require("express");
const tipsRouter = Router();
const tipsService = require("../services/tips.services");

tipsRouter.get("/daily-tips", async (req, res) => {
  try {
    res.status(200).send(await tipsService.getDailyTips());
  } catch (err) {
    res.status(500).send({ error: err?.response?.message });
  }
});

module.exports = tipsRouter;
