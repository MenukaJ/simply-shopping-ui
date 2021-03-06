import React, { Component } from "react";

import UserService from "../services/user.service";
import SideNavUserComponent from "./navigation/side-nav-user.component";

export default class PrivacyPolicyComponent extends Component {
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
                        <h3>FAQs</h3>
                    </header>
                </div>
            </>
        );
    }
}