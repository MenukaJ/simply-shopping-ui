import React, { Component } from "react";
import UserService from "../services/user.service";
import SideNavUserComponent from "./navigation/side-nav-user.component";
import ItemService from "../services/item.service";
import AttributeValueService from "../services/attribute-value.service";
import { Button } from "react-bootstrap";
import DeleteShoppingCartItem from './delete-shopping-cart-item.component';

export default class CheckoutComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            content: "",
            items: [],
            attribute1Id: '',
            attribute1Name: '',
            attribute2Id: '',
            attribute2Name: '',
            attribute3Id: '',
            attribute3Name: '',
            attribute4Id: '',
            attribute4Name: '',
            deleteModalShow: false,
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
        this.refreshList();
    }

    refreshList() {
        ItemService.getItemById(this.props.match.params.id).then(
            response => {
                this.setState({
                    items: response.data
                });
            },
            error => {
                this.setState({
                    items:
                        (error.response &&
                            error.response.data &&
                            error.response.data.message) ||
                        error.message ||
                        error.toString()
                });
            }
        );
        AttributeValueService.getAttributeValueByAttributeId(this.state.attribute1Id).then(
            response => {
                this.setState({
                    attribute1Values: response.data,
                });
            },
            error => {
                this.setState({
                    attribute1Values:
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
        let DeleteModelClose = () => this.setState({ deleteModalShow: false });
        const {items} = this.state;
        const totalRecords = items.length;
        return (
            <>
                <SideNavUserComponent />
                <div className="container">
                    <header className="jumbotron">
                        <h3>Checkout Your Order</h3><br/>
                        <div className="row">
                            <div className="col-lg-8 mb-4">
                                <div className="card wish-list pb-1">
                                    <div className="card-body">
                                        <h5 className="mb-2">Billing details</h5>
                                        <div className="row">
                                            <div className="col-lg-6">
                                                <div className="md-form md-outline mb-0 mb-lg-4">
                                                    <label htmlFor="firstName">First name</label>
                                                    <input type="text" disabled id="firstName" className="form-control mb-0 mb-lg-2" />
                                                </div>
                                            </div>
                                            <div className="col-lg-6">
                                                <div className="md-form md-outline">
                                                    <label htmlFor="lastName">Last name</label>
                                                    <input type="text" disabled id="lastName" className="form-control" />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="md-form md-outline">
                                            <label htmlFor="form14">Full Name</label>
                                            <input type="text" disabled id="form14" className="form-control" />
                                        </div><br/>
                                        <div className="row">
                                            <div className="col-lg-6">
                                                <div className="md-form md-outline mb-0 mb-lg-4">
                                                    <label htmlFor="firstName">Address Line 1</label>
                                                    <input type="text" disabled id="firstName" className="form-control mb-0 mb-lg-2" />
                                                </div>
                                            </div>
                                            <div className="col-lg-6">
                                                <div className="md-form md-outline">
                                                    <label htmlFor="lastName">Address Line 2</label>
                                                    <input type="text" disabled id="lastName" className="form-control" />
                                                </div>
                                            </div>
                                            <div className="col-lg-6">
                                                <div className="md-form md-outline">
                                                    <label htmlFor="lastName">Address Line 3</label>
                                                    <input type="text" disabled id="lastName" className="form-control" />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="col-lg-6">
                                                <div className="md-form md-outline mb-0 mb-lg-4">
                                                    <label htmlFor="form15">Email</label>
                                                    <input type="text" disabled id="firstName" className="form-control mb-0 mb-lg-2" />
                                                </div>
                                            </div>
                                            <div className="col-lg-6">
                                                <div className="md-form md-outline">
                                                    <label htmlFor="form18">Mobile</label>
                                                    <input type="text" disabled id="lastName" className="form-control" />
                                                </div>
                                            </div>
                                            <div className="col-lg-6">
                                                <div className="md-form md-outline">
                                                    <label htmlFor="form18">Land Phone</label>
                                                    <input type="text" disabled id="lastName" className="form-control" />
                                                </div>
                                            </div>
                                            <div className="col-lg-6">
                                                <div className="md-form md-outline mb-0 mb-lg-4">
                                                    <label htmlFor="form16">NIC</label>
                                                    <input type="text" disabled id="firstName" className="form-control mb-0 mb-lg-2" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-4">
                                <div className="card mb-4">
                                    <div className="card-body">
                                        <h5 className="mb-3">The total amount of</h5>
                                        <ul className="list-group list-group-flush">
                                            <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-2 pb-0">
                                                Temporary amount
                                                <span>$53.98</span>
                                            </li>
                                            <li className="list-group-item d-flex justify-content-between align-items-center px-2">
                                                Shipping
                                                <span>Gratis</span>
                                            </li>
                                            <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-2 mb-3">
                                                <div>
                                                    <strong>The total amount of</strong>
                                                    <strong>
                                                        <p className="mb-0">(including VAT)</p>
                                                    </strong>
                                                </div>
                                                <span><strong>$53.98</strong></span>
                                            </li>
                                        </ul>
                                        <button type="button" className="btn btn-primary btn-block waves-effect waves-light">Make purchase</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </header>
                </div>
            </>
        );
    }
}