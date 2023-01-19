import axiosApi from "./axios.config";

export default {
  async getDailyTip(category) {
    return await axiosApi.get(`tips/daily-tip/${category}`);
  },
};
