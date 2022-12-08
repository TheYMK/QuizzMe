import { Router } from "express";
import { ScoresService } from "../services/score.services";
const { verifyToken } = require("../middlewares/auth.middleware");

const scoresRouter = Router();

const scoresService = new ScoresService();

scoresRouter.post("/", verifyToken, async (req, res) => {
  try {
    res.status(200).send(await scoresService.addScore(req.body));
  } catch (error) {
    res.status(400).send(error.message);
  }
});

scoresRouter.post("/history", verifyToken, async (req, res) => {
  try {
    res.status(200).send(await scoresService.getScores(req["userId"]));
  } catch (error) {
    res.status(400).send(error.message);
  }
});

scoresRouter.post("/:scoreId", verifyToken, async (req, res) => {
  try {
    res
      .status(200)
      .send(await scoresService.getScore(req.params.scoreId, req["userId"]));
  } catch (error) {
    res.status(400).send(error.message);
  }
});

export default scoresRouter;
