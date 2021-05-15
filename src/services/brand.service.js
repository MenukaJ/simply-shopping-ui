import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:5000/brand/';

class BrandService {
    getAllBrand() {
        return axios.get(API_URL + 'all');
    }

    getBrandById(id) {
        return axios.get(API_URL + 'id/' + id);
    }

    getBrandByName(name) {
        return axios.get(API_URL + 'name/' + name);
    }

    getBrandByStatus(status) {
        return axios.get(API_URL + 'status/' + status);
    }

    addBrand(name, status) {
        return axios
            .post(API_URL + "add", {
                name,
                status
            }, {headers: authHeader()})
            .then(response => {
                return response.data;
            });
    }

    updateBrand(id, name, status) {
        return axios
            .put(API_URL + "update/" + id, {
                name,
                status
            }, {headers: authHeader()})
            .then(response => {
                return response.data;
            });
    }

    deleteBrandById(id) {
        return axios.delete(API_URL + 'id/' + id , { headers: authHeader() }).then(response => {
            return response.data;
        });
    }
}

export default new BrandService;
