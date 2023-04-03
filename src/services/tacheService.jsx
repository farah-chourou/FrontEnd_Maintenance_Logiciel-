import axios from "../custom/axios";

const API_URL = "/task/";

const addTask = (info, _idDeveloper, _idProject) => {
  console.log(info);
  return axios.post(`${API_URL}create/${_idProject}/${_idDeveloper}`, info);
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

const tacheService = {
  addTask,
  getAll,
  deleteOne,
  getOne,
};
export default tacheService;
