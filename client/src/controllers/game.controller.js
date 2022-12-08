import axiosApi from './axios.config';

export default {
  async getQuizzs(params) {
    return await axiosApi.get('games', { params });
  },

  async getQuizz(gameId, withReponse) {
    return await axiosApi.get(`games/${gameId}`, { params: withReponse });
  },

  async checkAnswers(answers) {
    return await axiosApi.post(`games/answer`, answers);
  },

  async getCategories() {
    return await axiosApi.get(`games/categories`);
  },
};
