import axios from "../custom/axios";

const API_URL = "/projet/";

const addProject = (info) => axios.post(`${API_URL}create`, info);

const getAll = () => axios.get(`${API_URL}get_all`);
const getAllFinish = () => axios.get(`${API_URL}get_all_finish`);

const deleteOne = (_id) => axios.delete(`${API_URL}delete_one/${_id}`);

const getOne = (_id) => axios.get(`${API_URL}get_one/${_id}`);
const updateProject = (_id, info) =>
  axios.put(`${API_URL}update_info/${_id}`, info);

const adminService = {
  addProject,
  getAll,
  deleteOne,
  getOne,
  updateProject,
  getAllFinish,
};
export default adminService;
