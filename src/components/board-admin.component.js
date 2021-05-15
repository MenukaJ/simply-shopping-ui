import React, { Component } from "react";
import Category from "./category.component"
import UserService from "../services/user.service";
import SideNavAdminComponent from "./navigation/side-nav-admin.component";

export default class BoardAdmin extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: ""
    };
  }

  componentDidMount() {
    UserService.getAdminBoard().then(
      response => {
        this.setState({
          content: response.data
        });
      },
      error => {
        this.setState({
          content:
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString()
        });
      }
    );
  }

  render() {
    return (
      <>
        <SideNavAdminComponent />
        <div className="container" >
          <header className="jumbotron" >
            <h3>{this.state.content}</h3>
          </header>
        </div>
      </>



    );
  }
}
