import React, { Component } from "react";
import UserService from "../services/user.service";
import SideNavUserComponent from "./navigation/side-nav-user.component";
import ItemService from "../services/item.service";
import AttributeValueService from "../services/attribute-value.service";
import { Button } from "react-bootstrap";
import DeleteShoppingCartItem from './delete-shopping-cart-item.component';
import { Link } from 'react-router-dom';

export default class ShoppingCartComponent extends Component {
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
                        <h3>Shopping Cart</h3><br/>
                        <div className="row">
                            <div className="col-md-6 mb-4 mb-md-0">
                                <div className="mb-3">
                                    <div className="pt-4 wish-list">
                                        <h5 className="mb-4">Cart (<span>{totalRecords}</span> items)</h5>
                                        <div className="row mb-4">
                                            <div className="col-md-5 col-lg-3 col-xl-3">
                                                <div className="view zoom overlay z-depth-1 rounded mb-3 mb-md-0">
                                                    <a href="#!">
                                                        <div className="mask">
                                                            <img className="img-fluid w-100" src={items.url1} style={{width: '100px', height : '100px'}} />
                                                            <div className="mask rgba-black-slight"/>
                                                        </div>
                                                    </a>
                                                </div>
                                            </div>
                                            <div className="col-md-7 col-lg-9 col-xl-9">
                                                <div>
                                                    <div className="d-flex justify-content-between">
                                                        <div>
                                                            <h5>{items.name}</h5>
                                                            <p className="mb-3 text-muted small">Brand : {items.brandsName}</p>
                                                            <p className="mb-3 text-muted small">{items.attribute1Name} : {items.attributeValueId1Name}</p>
                                                            <p className="mb-3 text-muted small">{items.attribute2Name} : {items.attributeValueId2Name}</p>
                                                            <p className="mb-3 text-muted small">{items.attribute3Name} : {items.attributeValueId3Name}</p>
                                                            <p className="mb-3 text-muted small">{items.attribute4Name} : {items.attributeValueId4Name}</p>
                                                            <p className="mb-3 text-muted small">Number of Items : <input className="quantity" min={0} name="quantity" defaultValue={1} type="number"/></p>
                                                        </div>
                                                    </div>
                                                    <div className="d-flex justify-content-between align-items-center">
                                                        <div>
                                                            <Button size="sm" variant='danger'
                                                                     onClick={() => this.setState({
                                                                         deleteModalShow: true,
                                                                         id: items.id
                                                                     })
                                                                     }><i className="fa fa-times"></i>&nbsp; Remove Item
                                                            </Button>
                                                            <DeleteShoppingCartItem
                                                                show={this.state.deleteModalShow}
                                                                onHide={DeleteModelClose}
                                                                id={this.state.id} />
                                                        </div>
                                                        <div>
                                                            <Button size="sm" variant='success'
                                                                    onClick={() => this.setState({
                                                                        deleteModalShow: true,
                                                                        id: items.id
                                                                    })
                                                                    }><i className="fa fa-gift"></i>&nbsp; Add Item
                                                            </Button>
                                                            <DeleteShoppingCartItem
                                                                show={this.state.deleteModalShow}
                                                                onHide={DeleteModelClose}
                                                                id={this.state.id} />
                                                        </div>
                                                        <p className="mb-0"><span><strong id="summary">Rs {items.price}</strong></span></p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <hr className="mb-4"/>
                                        <p className="text-primary mb-0"><i className="fa fa-exclamation-circle"/> Adding items to your cart does not mean booking them. So that do not delay the purchase,</p>
                                    </div>
                                </div>
                                <div className="mb-3">
                                    <div className="pt-4">
                                        <h5 className="mb-4">You will get your delivery on</h5>
                                        <p className="mb-0"> 2021-10-27 - 2021-10-30</p>
                                    </div>
                                </div>
                                <div className="mb-3">
                                    <div className="pt-4">
                                        <h5 className="mb-4">We accept</h5>
                                        <img className="mr-2" width="45px" src="https://mdbootstrap.com/wp-content/plugins/woocommerce-gateway-stripe/assets/images/visa.svg" alt="Visa"/>
                                        <img className="mr-2" width="45px" src="https://mdbootstrap.com/wp-content/plugins/woocommerce-gateway-stripe/assets/images/amex.svg" alt="American Express"/>
                                        <img className="mr-2" width="45px" src="https://mdbootstrap.com/wp-content/plugins/woocommerce-gateway-stripe/assets/images/mastercard.svg" alt="Mastercard"/>
                                        <img className="mr-2" width="45px" src="https://mdbootstrap.com/wp-content/plugins/woocommerce/includes/gateways/paypal/assets/images/paypal.png" alt="PayPal acceptance mark"/>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-4">
                                <div className="mb-3">
                                    <div className="pt-4">
                                        <h5 className="mb-3">Your total amount is</h5>
                                        <ul className="list-group list-group-flush">
                                            <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-2 pb-2">Net amount<span>Rs {items.price}</span></li>
                                            <li className="list-group-item d-flex justify-content-between align-items-center px-2">Discount<span>Rs {items.discount}</span></li>
                                            <li className="list-group-item d-flex justify-content-between align-items-center px-2">Delivery charge<span>Rs {500}</span></li>
                                            <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-2 mb-3">
                                                <div>
                                                    <strong>The total amount</strong>
                                                </div>
                                                <span><strong>Rs {items.price - items.discount + 500}</strong></span>
                                            </li>
                                        </ul>
                                        <Link className="btn btn-primary btn-block" to={`/checkout/${items.id}`}>Checkout &nbsp; <i className="fa fa-arrow-circle-o-right"></i></Link>

                                        <Link className="btn btn-dark btn-block" to={`/checkout/${items.id}`}>Get Delivery Charges &nbsp; <i className="fa fa-truck"></i></Link>
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