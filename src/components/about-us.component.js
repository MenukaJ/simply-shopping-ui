import React, { Component } from "react";

import UserService from "../services/user.service";
import SideNavUserComponent from "./navigation/side-nav-user.component";

export default class AboutUsComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            content: ""
        };
    }

    componentDidMount() {
        UserService.getPublicContent().then(
            response => {
                this.setState({
                    content: response.data
                });
            },
            error => {
                this.setState({
                    content:
                        (error.response && error.response.data) ||
                        error.message ||
                        error.toString()
                });
            }
        );
    }

    render() {
        return (
            <>
                <SideNavUserComponent />
                <div className="container">
                    <header className="jumbotron">
                        <h3>About Us</h3>
                        <p>
                            Our motivation
                            Have you ever ordered groceries online and wondered when you'll receive it? Ever wondered if you'll even get what you ordered? You're not alone.

                            At Cargills we listen to our customers' feedback, and in doing so we worked tirelessly to ensure that ordering online is as convenient and effortless as it is meant to be. Therefore, at Cargills Online we will deliver everything you want, when you want it, fresh to your home.

                            About Cargills Online
                            Cargills Online is the eCommerce platform of the Cargills Group. The platform enables consumers in Sri Lanka to order and enjoy a hassle - free delivery to one’s door step. It also enables non-residents around the world to order and send goods to their loved ones in Sri Lanka. The delivery is restricted to the postcodes marked under the serviceable areas listed in the website.

                            Customers can select from a diverse range of products across frozen, chilled and ambient temperatures. Such goods include fresh vegetables, fruits, dairy items, fish, meat, poultry and pharmacy items. The SKUs offered will vary according to supply availability, consumer demand and turnaround time to ensure that the items offered continue to be relevant and appropriate.

                            Trust us too, as you have been trusting and transacting with Cargills Food City outlets, Cargills Express outlets and Cargills Food Hall since 1983. We will pick, pack and deliver to you the best of grocery items 365 days a year. We are available across all major platforms: web, iOS and Android to serve you better and are aligned with Cargills’ Vision “FOOD WITH LOVE”.
                        </p>
                    </header>
                </div>
            </>
        );
    }
}