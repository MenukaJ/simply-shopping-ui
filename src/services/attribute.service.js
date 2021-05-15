import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:5000/attributes/';

class AttributeService {
    getAllAttributes() {
        return axios.get(API_URL + 'all');
    }

    getAttributesById(id) {
        return axios.get(API_URL + 'id/' + id);
    }

    getAttributesByName(name) {
        return axios.get(API_URL + 'name/' + name);
    }

    getAttributesByStatus(status) {
        return axios.get(API_URL + 'status/' + status);
    }

    addAttributes(name, status) {
        return axios
            .post(API_URL + "add", {
                name,
                status
            }, {headers: authHeader()})
            .then(response => {
                return response.data;
            });
    }

    updateAttributes(id, name, status) {
        return axios
            .put(API_URL + "update/" + id, {
                name,
                status
            }, {headers: authHeader()})
            .then(response => {
                return response.data;
            });
    }

    deleteAttributesById(id) {
        return axios.delete(API_URL + 'id/' + id , { headers: authHeader() }).then(response => {
            return response.data;
        });
    }
}

export default new AttributeService;
