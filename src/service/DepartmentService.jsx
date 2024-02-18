import axios from "axios";

const REST_API_BASE_URL = 'http://localhost:8080/api/departments';

export const listDepartments = () => {
    return axios.get(REST_API_BASE_URL);
}
export const createDepartment = (department) => axios.post(REST_API_BASE_URL,department);

export const getDepartment = (id) => axios.get(REST_API_BASE_URL + '/' + id);

export const updateDepartment = (departmentId , department) => axios.put(REST_API_BASE_URL + "/" + departmentId,department);

export const deleteDepartment = (departmentId) => axios.delete(REST_API_BASE_URL + '/' + departmentId);