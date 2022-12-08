import axiosApi from "./axios.config";

export default {
  async getScores() {
    return await axiosApi.get("scores");
  },

  async getScore(scoreId) {
    return await axiosApi.get(`scores/${scoreId}`);
  },
};
