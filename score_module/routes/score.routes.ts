import { Router } from 'express';
import { loggerHandler } from '../configs/logger.handler';
import { ScoresService } from '../services/score.services';
const { verifyToken } = require('../middlewares/auth.middleware');

const scoresRouter = Router();

const scoresService = new ScoresService();

scoresRouter.post('/', verifyToken, async (req, res) => {
  try {
    res.status(200).send(await scoresService.addScore(req.body));
  } catch (error) {
    await loggerHandler({
      message: error.message,
      level: 'error',
    });
    res.status(400).send(error.message);
  }
});

scoresRouter.post('/history', verifyToken, async (req, res) => {
  try {
    res.status(200).send(await scoresService.getScores(req['userId']));
  } catch (error) {
    await loggerHandler({
      message: error.message,
      level: 'error',
    });
    res.status(400).send(error.message);
  }
});

scoresRouter.post('/:scoreId', verifyToken, async (req, res) => {
  try {
    res
      .status(200)
      .send(await scoresService.getScore(req.params.scoreId, req['userId']));
  } catch (error) {
    await loggerHandler({
      message: error.message,
      level: 'error',
    });
    res.status(400).send(error.message);
  }
});

scoresRouter.post('/rank/:quizzId', verifyToken, async (req, res) => {
  try {
    res
      .status(200)
      .send(await scoresService.getRank(req.params.quizzId, req['userId']));
  } catch (error) {
    await loggerHandler({
      message: error.message,
      level: 'error',
    });
    res.status(400).send(error.message);
  }
});

export default scoresRouter;
