import axios from "axios";

const { REACT_APP_API_PORT } = process.env;

const customAxios = axios.create({
  baseURL: REACT_APP_API_PORT,
});

customAxios.interceptors.request.use(
  async (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

/* customAxios.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refreshToken = localStorage.getItem("refreshToken");
      axios.defaults.headers.common.authorization = `Bearer ${
        refreshToken || ""
      }`;
      console.log(refreshToken);
      const { data } = await axios.get(
        "http://localhost:8080/user/refreshToken"
      );
      console.log("dd");
      console.log(data);
      localStorage.setItem("token", data.token);
      return customAxios(originalRequest);
    }
    return Promise.reject(error);
  }
); */

export default customAxios;
