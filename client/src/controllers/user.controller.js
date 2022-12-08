import axiosApi from "./axios.config";

export default {
  async login(user) {
    return await axiosApi.post("users/login", user);
  },

  async register(user) {
    return await axiosApi.post("users/register", user);
  },

  async checkToken() {
    return await axiosApi.post("users/validate");
  },

  async logout() {
    return await axiosApi.get("users/logout");
  },
};
