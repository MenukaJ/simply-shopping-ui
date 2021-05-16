import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:5000/item/';

class ItemService {
    getAllItems() {
        return axios.get(API_URL + 'all');
    }

    getItemById(id) {
        return axios.get(API_URL + id);
    }

    getItemsByName(name) {
        return axios.get(API_URL + 'name/' + name);
    }

    getItemsByStatus(status) {
        return axios.get(API_URL + 'status/' + status);
    }

    addItem(categorysId,
            brandsId,
            name,
            description,
            quantity,
            attributeValueId1,
            attributeValueId2,
            attributeValueId3,
            attributeValueId4,
            image1,
            image2,
            image3,
            image4,
            price,
            discount,
            status) {
        return axios
            .post(API_URL + "save", {
                categorysId,
                brandsId,
                name,
                description,
                quantity,
                attributeValueId1,
                attributeValueId2,
                attributeValueId3,
                attributeValueId4,
                image1,
                image2,
                image3,
                image4,
                price,
                discount,
                status
            }, {headers: authHeader()})
            .then(response => {
                return response.data;
            });
    }

    updateItem(id,
               categorysId,
               brandsId,
               name,
               description,
               quantity,
               attributeValueId1,
               attributeValueId2,
               attributeValueId3,
               attributeValueId4,
               image1,
               image2,
               image3,
               image4,
               price,
               discount,
               status) {
        return axios
            .put(API_URL + id, {
                categorysId,
                brandsId,
                name,
                description,
                quantity,
                attributeValueId1,
                attributeValueId2,
                attributeValueId3,
                attributeValueId4,
                image1,
                image2,
                image3,
                image4,
                price,
                discount,
                status
            }, {headers: authHeader()})
            .then(response => {
                return response.data;
            });
    }

    deleteItem(id) {
        return axios.delete(API_URL + id , { headers: authHeader() }).then(response => {
            return response.data;
        });
    }
}

export default new ItemService;
