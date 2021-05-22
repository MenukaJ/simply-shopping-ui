import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:5000/delivey/';

class DeliveryService {

    getStatusById(id) {
        return axios.get(API_URL + 'status/' + id);
    }

    create(name, status, image) {
        return axios
            .post(API_URL + "make", {
                customerName,
                addressLine1,
                addressLine2,
                addressLine3,
                province,
                shippingCode,
                country,
                contactNo,
                "items": [
                    {
                        itemName,
                        itemWeight
                    }
                ]
            })
            .then(response => {
                return response.data;
            });
    }
}

export default new DeliveryService;
