import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:5000/dashboard/';

class DashboardService {
    getDashboard() {
        return axios.get(API_URL + 'get');
    }

}

export default new DashboardService;
