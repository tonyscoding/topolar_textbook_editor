import axios from 'axios';
import { API_URL, API_PROTOCOL } from './config';

const URL = API_PROTOCOL + API_URL;
const URL_temp = window.location.origin;

export class ApiService {
    getJSONTextbook(authHeader, fileId){
        return axios.get(`${URL}/api/textbook/jsontype/${fileId}/`,authHeader)
    }

    getTextbook(authHeader, textbookId){
        return axios.get(`${URL}/api/textbook/${textbookId}/`, authHeader);
    }

    getTextbooks(authHeader, queryString=''){
        return axios.get(`${URL}/api/textbook/${queryString}`, authHeader);
    }

    createTextbook(authHeader, textbook){
        return axios.post(`${URL}/api/textbook/`, textbook, authHeader);
    }
    
    deleteTextbook(authHeader, textbookId){
        return axios.delete(`${URL}/api/textbook/${textbookId}/`, authHeader);
    }

    uploadFile(authHeader, file){
        return axios.put(`${URL}/api/textbook/upload/`, file, authHeader);
    }

    login(body){
        return axios.post(`${URL}/api/login/`, body);
    }
}