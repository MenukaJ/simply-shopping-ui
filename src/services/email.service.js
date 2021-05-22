import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'https://api.mailjet.com/v3.1/';

class EmailService {

    send(Email, Name, Subject, TextPart, HTMLPart, CustomID) {
        var username = 'c8b1d466be8cd63df1e86b6c4f68780a';
        var password = 'c8b1d466be8cd63df1e86b6c4f68780a';
        var credentials = btoa(username + ':' + password);
        var basicAuth = 'Basic ' + credentials;
        return axios
            .post(API_URL + "send", {
                "Messages" : [
                    {
                        "From": {
                            "Email": "menukamadhusanka@gmail.com",
                            "Name": "Simply Shopping"
                        },
                        "To": {
                            Email,
                            Name
                        }
                    }
                ],
                Subject,
                TextPart,
                HTMLPart,
                CustomID
            }, {'Authorization': basicAuth})
            .then(response => {
                return response.data;
            });
    }

}

export default new EmailService;
