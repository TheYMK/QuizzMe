import axios from "axios";

const uriGateway = "http://localhost:3001/api/";

let axiosApi = axios.create({
  baseURL: uriGateway,
  headers: {
    "Content-type": "application/json",
  },
  withCredentials: true,
});

axiosApi.interceptors.response.use(
  /* RESPONSE */
  (response) => {
    return Promise.resolve(response);
  },

  /* ERROR */
  (err) => {
    return Promise.reject(err);
  }
);

export default axiosApi;
