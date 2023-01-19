const { Router } = require("express");
const tipsRouter = Router();
const tipsService = require("../services/tips.services");

tipsRouter.get("/daily-tip/:category", async (req, res) => {
  try {
    res.status(200).send(await tipsService.getDailyTips(req.params.category));
  } catch (err) {
    res.status(500).send({ error: err?.response?.message });
  }
});

module.exports = tipsRouter;
