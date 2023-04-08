import axios from "../custom/axios";

const API_URL = "/task/";

const addTask = (info, _idProject) => {
  console.log(info);
  return axios.post(`${API_URL}create/${_idProject}`, info);
};

const getAll = () => axios.get(`${API_URL}get_all`);
const getAllEnCours = () => axios.get(`${API_URL}get_all_tasks_en_cours`);
const getAllRealiser = () => axios.get(`${API_URL}get_all_tasks_realiser`);

const getAllByDeveloperId = () => axios.get(`${API_URL}get_all_of_developer`);

const deleteOne = (_id) => axios.delete(`${API_URL}delete_one/${_id}`);

const getOne = (_id) => axios.get(`${API_URL}get_one/${_id}`);
const getAllTaskByProjectId = (_id) =>
  axios.get(`${API_URL}/get_all_of_project/${_id}`);
const updateTask = (_id, info, _idProject) => {
  console.log(info);
  return axios.put(`${API_URL}update_info/${_id}/${_idProject}`, info);
};

// developer
const updateTaskEtat = (_id, info) =>
  axios.put(`${API_URL}updateEtat/${_id}`, info);

const addDocument = (_id, info) =>
  axios.put(`${API_URL}addDocument/${_id}`, info);
const tacheService = {
  updateTaskEtat,
  getAllByDeveloperId,
  addTask,
  getAll,
  deleteOne,
  getOne,
  getAllTaskByProjectId,
  updateTask,
  addDocument,
  getAllEnCours,
  getAllRealiser,
};
export default tacheService;
