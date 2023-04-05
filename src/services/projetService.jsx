import axios from "../custom/axios";

const API_URL = "/projet/";

const addProject = (info) => {
  console.log(info);
  return axios.post(`${API_URL}create`, info);
};

const getAll = () => axios.get(`${API_URL}get_all`);

const deleteOne = (_id) => axios.delete(`${API_URL}delete_one/${_id}`);

const getOne = (_id) => axios.get(`${API_URL}get_one/${_id}`);
const updateProject = (_id) => axios.put(`${API_URL}update_info/${_id}`);

const adminService = {
  addProject,
  getAll,
  deleteOne,
  getOne,
  updateProject,
};
export default adminService;
