import React, { Component } from "react";

import UserService from "../services/user.service";
import SideNavUserComponent from "./navigation/side-nav-user.component";

export default class BoardUser extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: ""
    };
  }

  componentDidMount() {
    UserService.getUserBoard().then(
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
        <SideNavUserComponent />
        <div className="container">
          <h1>Profile</h1>
          <h3>Basic Information</h3>
          <p>Line 39:25:  The href attribute requires a valid value to be accessible. Provide a valid, navigable address as the href value. If you cannot provide a valid href, but still need the element to resemble a link, use a button and change it with appropriate styles. Learn more: https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/anchor-is-valid.md  jsx-a11y/anchor-is-valid</p>
          <h3>Additional Information</h3>
          <textarea></textarea>
          <br/>
          <button>Add</button>
        </div>
      </>
    );
  }
}
