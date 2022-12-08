import { ScoreInputAttributes, ScoreAttributes } from "../models/score.model";
import { ScoreDAO } from "../dao/score.dao";

export class ScoresService {
  private scoreDAO: ScoreDAO = new ScoreDAO();

  public async addScore(body: ScoreInputAttributes): Promise<ScoreAttributes> {
    const score: ScoreInputAttributes = {
      ...body,
      grade: `${body.goodAnswers.length}/${
        body.goodAnswers.length + body.badAnswers.length
      }`,
    };

    return await this.scoreDAO.addScore(score);
  }

  public async getScores(
    userId: ScoreAttributes["userId"]
  ): Promise<ScoreAttributes[]> {
    return await this.scoreDAO.getScores(userId);
  }

  public async getScore(
    id: ScoreAttributes["id"],
    userId: ScoreAttributes["userId"]
  ): Promise<ScoreAttributes> {
    return await this.scoreDAO.getScore(id, userId);
  }
}
