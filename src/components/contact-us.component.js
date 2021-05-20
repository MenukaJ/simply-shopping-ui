import React, { Component } from "react";

import UserService from "../services/user.service";
import SideNavUserComponent from "./navigation/side-nav-user.component";

export default class ContactUsComponent extends Component {
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
                        <h3>Contact Us</h3>
                        <p>
                            To get in touch with our customer service team email us at customerservice@cargillsonline.com or give us a call on 0117129129 between 8am to 8pm daily. We look forward to serving you with all grocery needs fresh to your home!
                        </p>
                    </header>
                </div>
            </>
        );
    }
}