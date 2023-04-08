import axios from "../custom/axios";

const API_URL = "/user/";

const login = (info) => axios.post(`${API_URL}login`, info);
const getUserByToken = () => axios.get(`${API_URL}getUserByToken`);

const forgotPassword = (email) => axios.post(`${API_URL}forgot`, email);
const changePassword = (info) => axios.put(`${API_URL}change_password`, info);

const authService = {
  login,
  getUserByToken,
  forgotPassword,
  changePassword,
};

export default authService;
