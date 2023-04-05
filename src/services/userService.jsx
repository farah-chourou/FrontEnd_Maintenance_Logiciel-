import axios from "../custom/axios";

const API_URL = "/user/";

const addDeveloper = (info) => {
  console.log(info);
  return axios.post(`${API_URL}create`, info);
};

const getAll = () => axios.get(`${API_URL}get_all`);

const deleteOne = (_id) => axios.delete(`${API_URL}delete_one/${_id}`);

const getOne = (_id) => axios.get(`${API_URL}get_one/${_id}`);
const updateProfile = (_id) => axios.put(`${API_URL}update_info/${_id}`);
const updateDeveloper = (_id, info) =>
  axios.put(`${API_URL}update_info/${_id}`, info);

const adminService = {
  addDeveloper,
  getAll,
  deleteOne,
  getOne,
  updateProfile,
  updateDeveloper,
};
export default adminService;
