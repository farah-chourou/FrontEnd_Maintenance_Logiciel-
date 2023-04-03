import axios from "../custom/axios";

const API_URL = "/user/";

const addDeveloper = (info) => {
  console.log(info);
  return axios.post(`${API_URL}create`, info);
};

const getAll = () => {
  return axios.get(`${API_URL}get_all`);
};

const deleteOne = (_id) => {
  return axios.get(`${API_URL}delete_one/${_id}`);
};

const getOne = (_id) => {
  return axios.get(`${API_URL}get_one/${_id}`);
};
const updateProfile = (_id) => {
  return axios.get(`${API_URL}update_info/${_id}`);
};

const adminService = {
  addDeveloper,
  getAll,
  deleteOne,
  getOne,
  updateProfile,
};
export default adminService;
