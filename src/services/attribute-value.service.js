import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:5000/attribute-value/';

class CategoryService {
    getAllAttributeValue() {
        return axios.get(API_URL + 'all');
    }

    getAttributeValueById(id) {
        return axios.get(API_URL + 'id/' + id);
    }

    getAttributeValueByName(name) {
        return axios.get(API_URL + 'name/' + name);
    }

    getAttributeValueByStatus(status) {
        return axios.get(API_URL + 'status/' + status);
    }

    addAttributeValue(name, status, attributesId) {
        return axios
            .post(API_URL + "add", {
                name,
                status,
                attributesId
            }, {headers: authHeader()})
            .then(response => {
                return response.data;
            });
    }

    updateAttributeValue(id, name, status, attributesId) {
        return axios
            .put(API_URL + "update/" + id, {
                name,
                status,
                attributesId
            }, {headers: authHeader()})
            .then(response => {
                return response.data;
            });
    }

    deleteAttributeValueById(id) {
        return axios.delete(API_URL + 'id/' + id , { headers: authHeader() }).then(response => {
            return response.data;
        });
    }
}

export default new CategoryService;
