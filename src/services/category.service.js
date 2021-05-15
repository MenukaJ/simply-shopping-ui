import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:5000/category/';

class CategoryService {
    getAllCategory() {
        return axios.get(API_URL + 'all');
    }

    getCategoryById(id) {
        return axios.get(API_URL + 'id/' + id);
    }

    getCategoryByName(name) {
        return axios.get(API_URL + 'name/' + name);
    }

    getCategoryByStatus(status) {
        return axios.get(API_URL + 'status/' + status);
    }

    addCategory(name, status) {
        return axios
            .post(API_URL + "add", {
                name,
                status
            }, {headers: authHeader()})
            .then(response => {
                return response.data;
            });
    }

    updateCategory(id, name, status) {
        return axios
            .put(API_URL + "update/" + id, {
                name,
                status
            }, {headers: authHeader()})
            .then(response => {
                return response.data;
            });
    }

    deleteCategoryById(id) {
        return axios.delete(API_URL + 'id/' + id , { headers: authHeader() }).then(response => {
            return response.data;
        });
    }
}

export default new CategoryService;
