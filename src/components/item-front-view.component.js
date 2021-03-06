import React, { Component } from "react";
import UserService from "../services/user.service";
import SideNavUserComponent from "./navigation/side-nav-user.component";
import ItemService from "../services/item.service";
import AttributeValueService from "../services/attribute-value.service";
import { Link } from 'react-router-dom';
import OrderService from "../services/order.service";
import BuyerService from "../services/buyer.service";

export default class ItemFrontViewComponent extends Component {
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
            buyers : [],
            buyersId : '',
            itemsId: '',
            quantity: '',
            amount: ''
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
        BuyerService.getBuyerById(100).then(
            response => {
                this.setState({
                    buyers: response.data
                });
            },
            error => {
                this.setState({
                    buyers:
                        (error.response &&
                            error.response.data &&
                            error.response.data.message) ||
                        error.message ||
                        error.toString()
                });
            }
        );
    }

    handleSubmit(event) {
        event.preventDefault();
        OrderService.addOrder(100,
            50,
            20,
            1000).then(
            response => {
                if (response.message !== undefined) {
                    this.setState({snackbaropen: true, snackbarmsg: response.message})
                    this.props.history.push(`/shopping-cart`);
                    window.location.reload();
                }
            },
            error => {
                console.log(error);
                if (error.response.data.message !== undefined) {
                    this.setState({snackbaropen: true, snackbarmsg: error.response.data.message})
                } else if (error.response.data.price !== undefined) {
                    this.setState({snackbaropen: true, snackbarmsg: error.response.data.buyersId})
                } else {
                    this.setState({snackbaropen: true, snackbarmsg: "Failed to add!"})
                }
            }
        );
    }

    imageClick = () => {
        console.log('Image Clicked.');
    }

    render() {
        const {items} = this.state;
        const {buyers} = this.state;
        return (
            <>
                <SideNavUserComponent />
                <div className="container">
                    <header className="jumbotron">
                        <h3>{items.name}</h3><br/>
                        <div className="row">
                            <div className="col-md-6 mb-4 mb-md-0">
                                <div id="mdb-lightbox-ui"/>
                                <div className="mdb-lightbox">
                                    <div className="row product-gallery mx-1">
                                        <div className="col-12 mb-0">
                                            <figure className="view overlay rounded z-depth-1 main-img">
                                                <a href={items.url1} data-size="710x823">
                                                    <img src={items.url1} className="img-fluid z-depth-1" onClick={this.imageClick} />
                                                </a>
                                            </figure>
                                        </div>
                                        <div className="col-12">
                                            <div className="row">
                                                <div className="col-3">
                                                    <div className="view overlay rounded z-depth-1 gallery-item">
                                                        <a href={items.url1} data-size="710x823">
                                                            <img src={items.url1} className="img-fluid" style={{width: '100px', height : '100px'}} onClick={this.imageClick} />
                                                        </a>
                                                        <div className="mask rgba-white-slight"/>
                                                    </div>
                                                </div>
                                                <div className="col-3">
                                                    <div className="view overlay rounded z-depth-1 gallery-item">
                                                        <a href={items.url2} data-size="710x823">
                                                            <img src={items.url2} className="img-fluid" style={{width: '100px', height : '100px'}} onClick={this.imageClick} />
                                                        </a>
                                                        <div className="mask rgba-white-slight"/>
                                                    </div>
                                                </div>
                                                <div className="col-3">
                                                    <div className="view overlay rounded z-depth-1 gallery-item">
                                                        <a href={items.url3} data-size="710x823">
                                                            <img src={items.url3} className="img-fluid" style={{width: '100px', height : '100px'}} onClick={this.imageClick} />
                                                        </a>
                                                        <div className="mask rgba-white-slight"/>
                                                    </div>
                                                </div>
                                                <div className="col-3">
                                                    <div className="view overlay rounded z-depth-1 gallery-item">
                                                        <a href={items.url4} data-size="710x823">
                                                            <img src={items.url4} className="img-fluid" style={{width: '100px', height : '100px'}} onClick={this.imageClick} />
                                                        </a>
                                                        <div className="mask rgba-white-slight"/>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <h5>{items.name}</h5>
                                <p className="mb-2 text-muted text-uppercase small">{items.categorysName}</p>
                                <p><span className="mr-1">Price : <strong>Rs.{items.price}</strong></span></p>
                                <p><span className="mr-1">Discount : <strong>Rs.{items.discount}</strong></span></p>
                                <p className="pt-1">{items.description}</p>
                                <div className="table-responsive">
                                    <table className="table table-sm table-borderless mb-0">
                                        <tbody>
                                        <tr>
                                            <th className="pl-0 w-25" scope="row"><strong>Brand</strong></th>
                                            <td>{items.brandsName}</td>
                                        </tr>
                                        <tr>
                                            <th className="pl-0 w-25" scope="row"><strong>{items.attribute1Name}</strong></th>
                                            <td>{items.attributeValueId1Name}</td>
                                        </tr>
                                        <tr>
                                            <th className="pl-0 w-25" scope="row"><strong>{items.attribute2Name}</strong></th>
                                            <td>{items.attributeValueId2Name}</td>
                                        </tr>
                                        <tr>
                                            <th className="pl-0 w-25" scope="row"><strong>{items.attribute3Name}</strong></th>
                                            <td>{items.attributeValueId3Name}</td>
                                        </tr>
                                        <tr>
                                            <th className="pl-0 w-25" scope="row"><strong>{items.attribute4Name}</strong></th>
                                            <td>{items.attributeValueId4Name}</td>
                                        </tr>
                                        </tbody>
                                    </table>
                                </div><br/>
                                <p><span className="mr-1">Quantity : <input className="quantity" min={0} name="quantity" id="quantity" defaultValue={1} type="number"/></span></p>
                                <hr/>
                                <Link className="btn btn-primary btn-md mr-1 mb-2" to={`/shopping-cart/${items.id}`}>Add to cart &nbsp; <i className="fa fa-shopping-cart"></i></Link>
                            </div>
                        </div>
                    </header>
                </div>
            </>
        );
    }
}