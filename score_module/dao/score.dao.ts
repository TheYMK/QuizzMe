import {
  Score,
  ScoreAttributes,
  ScoreInputAttributes,
} from '../models/score.model';

export class ScoreDAO {
  public async addScore(score: ScoreInputAttributes): Promise<ScoreAttributes> {
    return await Score.create(score);
  }

  public async getScores(
    userId: ScoreInputAttributes['userId']
  ): Promise<ScoreAttributes[]> {
    return await Score.findAll({ where: { userId } });
  }

  public async getScore(
    id: ScoreInputAttributes['id'],
    userId: ScoreInputAttributes['userId']
  ): Promise<ScoreAttributes> {
    return await Score.findOne({ where: { id, userId } });
  }

  public async getRank(
    quizzId: ScoreInputAttributes['quizzId']
  ): Promise<ScoreAttributes[]> {
    return await Score.findAll({
      where: {
        quizzId,
      },
    });
  }
}
