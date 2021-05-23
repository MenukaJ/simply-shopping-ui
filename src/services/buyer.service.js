import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:5000/buyer/';

class BuyerService {
    getAllBuyers() {
        return axios.get(API_URL + 'all');
    }

    getBuyerById(id) {
        return axios.get(API_URL + 'id/' + id);
    }

    getBuyerByUserId(userId) {
        return axios.get(API_URL + 'userId/' + userId);
    }

    addBuyer(firstName,
              lastName,
              fullName,
              addressLine1,
              addressLine2,
              addressLine3,
              email,
              mobileNumber,
              landLine,
              userId,
              nic,
              dob,
              status) {
        return axios
            .post(API_URL + "save", {
                firstName,
                lastName,
                fullName,
                addressLine1,
                addressLine2,
                addressLine3,
                email,
                mobileNumber,
                landLine,
                userId,
                nic,
                dob,
                status
            }, {headers: authHeader()})
            .then(response => {
                return response.data;
            });
    }

    updateBuyer(id,
               firstName,
               lastName,
               fullName,
               addressLine1,
               addressLine2,
               addressLine3,
               email,
               mobileNumber,
               landLine,
               userId,
               nic,
               dob,
               status) {
        return axios
            .put(API_URL + "id/" + id, {
                firstName,
                lastName,
                fullName,
                addressLine1,
                addressLine2,
                addressLine3,
                email,
                mobileNumber,
                landLine,
                userId,
                nic,
                dob,
                status
            }, {headers: authHeader()})
            .then(response => {
                return response.data;
            });
    }
}

export default new BuyerService;