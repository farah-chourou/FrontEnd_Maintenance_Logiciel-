import axios from "../custom/axios";

const API_URL = "/user/";

const login = (info) => {
  return axios.post(`${API_URL}login`, info);
};
const getUserByToken = () => {
  return axios.get(`${API_URL}getUserByToken`);
};

const forgotPassword = (email) => {
  return axios.post(`${API_URL}forgot`, email);
};

const authService = {
  login,
  getUserByToken,
  forgotPassword,
};

export default authService;
