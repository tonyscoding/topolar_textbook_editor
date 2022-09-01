import axios from "axios";

// URL
export const API_URL = process.env.REACT_API_URL;
export const API_PROTOCOL = process.env.REACT_API_PROTOCOL;

const URL = API_PROTOCOL + API_URL;

export const login = (body) => {
    return axios.post(`${URL}/api/login/`, body)
}

export const getJSONTextbook = (authHeader, fileId) => {
    return axios.get(`${URL}/api/textbook/jsontype/${fileId}/`,authHeader)
}

export const getTextbook = (authHeader, textbookId) => {
    return axios.get(`${URL}/api/textbook/${textbookId}/`, authHeader);
}

export const getCurriculum = (authHeader) => {
    return axios.get(`${URL}/api/curriculum/`, authHeader)
}

export const getTextbookListByLevel = (authHeader, curriculum, textbookLevel) => {
    return axios.get(`${URL}/api/textbook/index/${curriculum}/${textbookLevel}/`, authHeader)
}

export const createTextbook = (authHeader, textbook) => {
    return axios.post(`${URL}/api/textbook/`, textbook, authHeader);
}

export const deleteTextbook = (authHeader, textbookId) => {
    return axios.delete(`${URL}/api/textbook/${textbookId}/`, authHeader);
}

export const uploadFile = (authHeader, file) => {
    return axios.put(`${URL}/api/textbook/upload/`, file, authHeader);
}

export const getProblem = (authHeader, number) => {
    return axios.get(`${URL}/api/problem/${number}`, authHeader);
}

export const getProblemList = (authHeader) => {
    return axios.get(`${URL}/api/problem/`, authHeader);
}

export const getCourseList = (authHeader) => {
    return axios.get(`${URL}/api/course/`, authHeader);
}