import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import AuthService from "../services/auth.service";
import BuyerService from "../services/buyer.service";
import {Button, ButtonToolbar} from "react-bootstrap";
import AddBuyerModalComponent from "./modal/add-buyer-modal.component";
import EditBuyerModalComponent from "./modal/edit-buyer-modal.component";

export default class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      redirect: null,
      userReady: false,
      currentUser: { username: "" },
      currentBuyer: [],
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
    BuyerService.getBuyerByUserId(currentUserId).then(
        response => {
          this.setState({
            currentBuyer: response.data, addModalShow: false
          });
        },
        error => {
          this.setState({
            currentBuyer:
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
    const { currentBuyer } = this.state;

    let EditModalClose = () => this.setState({editModalShow: false})
    let AddModalClose = () => this.setState({addModalShow: false})

    return (
      <div className="container">
        {(this.state.userReady) ?
            <div>
              <div className="container">
                {(this.state.userReady) ?
                    <div>
                      <AddBuyerModalComponent
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
                            <EditBuyerModalComponent
                                show={this.state.editModalShow}
                                onHide={EditModalClose}
                                currentUser={currentUser}
                                currentBuyer={currentBuyer}/>
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
                                        <p>{ currentBuyer.firstName }</p>
                                      </div>
                                    </div>
                                    <div className="col-lg-6">
                                      <div className="md-form md-outline">
                                        <label htmlFor="lastName">Last Name</label>
                                        <p>{ currentBuyer.lastName }</p>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="md-form md-outline">
                                    <label htmlFor="form14">Full Name</label>
                                    <p>{ currentBuyer.fullName }</p>
                                  </div><br/>
                                  <div className="row">
                                    <div className="col-lg-6">
                                      <div className="md-form md-outline">
                                        <label htmlFor="form14">Address</label>
                                        <p>{ currentBuyer.addressLine1 }, { currentBuyer.addressLine2 }, { currentBuyer.addressLine3 }</p>
                                      </div><br/>
                                    </div>
                                    <div className="col-lg-6">
                                      <div className="md-form md-outline">
                                        <label htmlFor="form14">Date of Birth</label>
                                        <p>{ currentBuyer.dob }</p>
                                      </div><br/>
                                    </div>
                                  </div>
                                  <div className="row">
                                    <div className="col-lg-6">
                                      <div className="md-form md-outline mb-0 mb-lg-4">
                                        <label htmlFor="form15">Email</label>
                                        <p>{ currentBuyer.email }</p>
                                      </div>
                                    </div>
                                    <div className="col-lg-6">
                                      <div className="md-form md-outline">
                                        <label htmlFor="form18">Mobile</label>
                                        <p>{ currentBuyer.mobileNumber }</p>
                                      </div>
                                    </div>
                                    <div className="col-lg-6">
                                      <div className="md-form md-outline">
                                        <label htmlFor="form18">Land Phone</label>
                                        <p>{ currentBuyer.landLine }</p>
                                      </div>
                                    </div>
                                    <div className="col-lg-6">
                                      <div className="md-form md-outline mb-0 mb-lg-4">
                                        <label htmlFor="form16">NIC</label>
                                        <p>{ currentBuyer.nic }</p>
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
