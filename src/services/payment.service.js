import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:5000/payment/';

class PaymentService {

    makePayment(cardNumber, cvCode, year, month, payment, branch) {
        return axios
            .post(API_URL + "make", {
                cardNumber,
                cvCode,
                year,
                month,
                payment,
                branch
            }, {headers: authHeader()})
            .then(response => {
                return response.data;
            });
    }


}

export default new PaymentService;
