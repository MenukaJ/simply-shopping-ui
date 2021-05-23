import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import AuthService from "../services/auth.service";
import SellerService from "../services/seller.service";
import {Button, ButtonToolbar} from "react-bootstrap";
import AddSellerModalComponent from "./modal/add-seller-modal.component";
import EditSellerModalComponent from "./modal/edit-seller-modal.component";

export default class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      redirect: null,
      userReady: false,
      currentUser: { username: "" },
      currentSeller: [],
      addModalShow: true,
      editModalShow: false
    };
  }

  componentDidMount() {
    const currentUser = AuthService.getCurrentUser();

    if (!currentUser) this.setState({ redirect: "/home" });
    this.setState({ currentUser: currentUser, userReady: true })

    const currentUserid = currentUser.id;

    this.refreshList(currentUserid);
  }

  refreshList(currentUserId) {
    SellerService.getSellerByUserId(currentUserId).then(
        response => {
          this.setState({
            currentSeller: response.data, addModalShow: false
          });
        },
        error => {
          this.setState({
            currentSeller:
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
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />
    }

    const { currentUser, addModalShow } = this.state;
    const { currentSeller } = this.state;

    let EditModalClose = () => this.setState({editModalShow: false})
    let AddModalClose = () => this.setState({addModalShow: false})

    return (
      <div className="container">
        {(this.state.userReady) ?
            <div>
              <div className="container">
                {(this.state.userReady) ?
                    <div>
                      <AddSellerModalComponent
                          show={this.state.addModalShow}
                          onHide={AddModalClose}
                          currentUser={currentUser}/>
                      <header className="jumbotron">
                        <div className="row">
                          <div className="col-lg-8 mb-4">
                            <h3>
                              <div className="col-lg-6">
                                <strong>User Id</strong>
                              </div>
                              <div className="col-lg-6">
                                <strong>{currentUser.username}</strong>
                              </div>
                            </h3>
                          </div>
                          <div className="col-lg-8 mb-4">
                            <ButtonToolbar>
                              <Button variant='primary'
                                      onClick={() => this.setState({
                                        editModalShow: true
                                      })
                                      }>Edit</Button>
                            </ButtonToolbar>
                            <EditSellerModalComponent
                                show={this.state.editModalShow}
                                onHide={EditModalClose}
                                currentUser={currentUser}
                                currentSeller={currentSeller}/>
                          </div>
                        </div>
                      </header>
                      <div className="container">
                        <header className="jumbotron">
                          <h3>Profile Details</h3>
                          <div className="row">
                            <div className="col-lg-8 mb-4">
                              <div className="card wish-list pb-1">
                                <div className="card-body">
                                  <div className="row">
                                    <div className="col-lg-6">
                                      <div className="md-form md-outline mb-0 mb-lg-4">
                                        <label htmlFor="firstName">First Name</label>
                                        <p>{ currentSeller.firstName }</p>
                                      </div>
                                    </div>
                                    <div className="col-lg-6">
                                      <div className="md-form md-outline">
                                        <label htmlFor="lastName">Last Name</label>
                                        <p>{ currentSeller.lastName }</p>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="md-form md-outline">
                                    <label htmlFor="form14">Full Name</label>
                                    <p>{ currentSeller.fullName }</p>
                                  </div><br/>
                                  <div className="row">
                                    <div className="col-lg-6">
                                      <div className="md-form md-outline">
                                        <label htmlFor="form14">Address</label>
                                        <p>{ currentSeller.addressLine1 }, { currentSeller.addressLine2 }, { currentSeller.addressLine3 }</p>
                                      </div><br/>
                                    </div>
                                    <div className="col-lg-6">
                                      <div className="md-form md-outline">
                                        <label htmlFor="form14">Date of Birth</label>
                                        <p>{ currentSeller.dob }</p>
                                      </div><br/>
                                    </div>
                                  </div>
                                  <div className="row">
                                    <div className="col-lg-6">
                                      <div className="md-form md-outline mb-0 mb-lg-4">
                                        <label htmlFor="form15">Email</label>
                                        <p>{ currentSeller.email }</p>
                                      </div>
                                    </div>
                                    <div className="col-lg-6">
                                      <div className="md-form md-outline">
                                        <label htmlFor="form18">Mobile</label>
                                        <p>{ currentSeller.mobile }</p>
                                      </div>
                                    </div>
                                    <div className="col-lg-6">
                                      <div className="md-form md-outline">
                                        <label htmlFor="form18">Land Phone</label>
                                        <p>{ currentSeller.landline }</p>
                                      </div>
                                    </div>
                                    <div className="col-lg-6">
                                      <div className="md-form md-outline mb-0 mb-lg-4">
                                        <label htmlFor="form16">NIC</label>
                                        <p>{ currentSeller.nic }</p>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </header>
                      </div>
                    </div> : null}
              </div>
            </div> : null}
      </div>
    );
  }
}
