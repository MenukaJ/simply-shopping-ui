import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:5000/seller/';

class SellerService {
    getAllSellers() {
        return axios.get(API_URL + 'all');
    }

    getSellerById(id) {
        return axios.get(API_URL + 'id/' + id);
    }

    getSellerByUserId(userId) {
        return axios.get(API_URL + 'userId/' + userId);
    }

    addSeller(firstName,
              lastName,
              fullName,
              addressLine1,
              addressLine2,
              addressLine3,
              email,
              mobile,
              landline,
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
                mobile,
                landline,
                userId,
                nic,
                dob,
                status
            }, {headers: authHeader()})
            .then(response => {
                return response.data;
            });
    }

    updateSeller(id,
               firstName,
               lastName,
               fullName,
               addressLine1,
               addressLine2,
               addressLine3,
               email,
               mobile,
               landline,
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
                mobile,
                landline,
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

export default new SellerService;