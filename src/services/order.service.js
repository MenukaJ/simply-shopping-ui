import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:5000/order/';

class OrderService {
    getAllOrders() {
        return axios.get(API_URL + 'all');
    }

    getOrderById(id) {
        return axios.get(API_URL + id);
    }

    getOrdersByStatus(status) {
        return axios.get(API_URL + 'status/' + status);
    }

    getOrderByBuyerIdAndPaidStatus(buyerId, paidStatus) {
        return axios.get(API_URL + 'buyer/' + buyerId + '/status/' + paidStatus);
    }

    checkBuyerHasOrders(buyerId) {
        return axios.get(API_URL + 'check/buyer/' + buyerId);
    }

    addOrder(buyersId,
             itemsId,
             quantity,
             amount) {
        return axios
            .post(API_URL + "save", {
                buyersId,
                "itemList": [
                    {
                        itemsId,
                        quantity,
                        amount
                    }
                ]
            }, {headers: authHeader()})
            .then(response => {
                return response.data;
            });
    }

    updateOrder(id,
                serviceCharge,
                vatCharge,
                netAmount,
                paidStatus,
                paymentRefNo,
                deliveryFlag) {
        return axios
            .put(API_URL + id, {
                serviceCharge,
                vatCharge,
                netAmount,
                paidStatus,
                paymentRefNo,
                deliveryFlag
            }, {headers: authHeader()})
            .then(response => {
                return response.data;
            });
    }

    deleteOrder(id) {
        return axios.delete(API_URL + id , { headers: authHeader() }).then(response => {
            return response.data;
        });
    }

    addOrderItem(id,
                 itemsId,
                 quantity,
                 amount) {
        return axios
            .post(API_URL + "save/order/" + id, {
                 itemsId,
                 quantity,
                 amount
            }, {headers: authHeader()})
            .then(response => {
                return response.data;
            });
    }

    deleteOrderItem(id) {
        return axios.delete(API_URL + 'order-item/' + id, { headers: authHeader() }).then(response => {
            return response.data;
        });
    }

}

export default new OrderService;
