import React, { Component } from "react";
import UserService from "../services/user.service";
import SideNavUserComponent from "./navigation/side-nav-user.component";
import ItemService from "../services/item.service";
import AttributeValueService from "../services/attribute-value.service";

export default class ItemFrontViewComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            content: "",
            items: {},
            attribute1Id: '',
            attribute1Name: '',
            attribute2Id: '',
            attribute2Name: '',
            attribute3Id: '',
            attribute3Name: '',
            attribute4Id: '',
            attribute4Name: ''
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

    imageClick = () => {
        console.log('Image Clicked.');
    }

    render() {
        return (
            <>
                <SideNavUserComponent />
                <div className="container">
                    <header className="jumbotron">
                        <h3>{this.state.items.name}</h3><br/>
                        <div className="row">
                            <div className="col-md-6 mb-4 mb-md-0">
                                <div id="mdb-lightbox-ui"/>
                                <div className="mdb-lightbox">
                                    <div className="row product-gallery mx-1">
                                        <div className="col-12 mb-0">
                                            <figure className="view overlay rounded z-depth-1 main-img">
                                                <a href={this.state.items.url1} data-size="710x823">
                                                    <img src={this.state.items.url1} className="img-fluid z-depth-1" onClick={this.imageClick} />
                                                </a>
                                            </figure>
                                        </div>
                                        <div className="col-12">
                                            <div className="row">
                                                <div className="col-3">
                                                    <div className="view overlay rounded z-depth-1 gallery-item">
                                                        <a href={this.state.items.url1} data-size="710x823">
                                                            <img src={this.state.items.url1} className="img-fluid" style={{width: '100px', height : '100px'}} onClick={this.imageClick} />
                                                        </a>
                                                        <div className="mask rgba-white-slight"/>
                                                    </div>
                                                </div>
                                                <div className="col-3">
                                                    <div className="view overlay rounded z-depth-1 gallery-item">
                                                        <a href={this.state.items.url2} data-size="710x823">
                                                            <img src={this.state.items.url2} className="img-fluid" style={{width: '100px', height : '100px'}} onClick={this.imageClick} />
                                                        </a>
                                                        <div className="mask rgba-white-slight"/>
                                                    </div>
                                                </div>
                                                <div className="col-3">
                                                    <div className="view overlay rounded z-depth-1 gallery-item">
                                                        <a href={this.state.items.url3} data-size="710x823">
                                                            <img src={this.state.items.url3} className="img-fluid" style={{width: '100px', height : '100px'}} onClick={this.imageClick} />
                                                        </a>
                                                        <div className="mask rgba-white-slight"/>
                                                    </div>
                                                </div>
                                                <div className="col-3">
                                                    <div className="view overlay rounded z-depth-1 gallery-item">
                                                        <a href={this.state.items.url4} data-size="710x823">
                                                            <img src={this.state.items.url4} className="img-fluid" style={{width: '100px', height : '100px'}} onClick={this.imageClick} />
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
                                <h5>{this.state.items.name}</h5>
                                <p className="mb-2 text-muted text-uppercase small">{this.state.items.categorysName}</p>
                                <p><span className="mr-1">Price : <strong>Rs.{this.state.items.price}</strong></span></p>
                                <p><span className="mr-1">Discount : <strong>Rs.{this.state.items.discount}</strong></span></p>
                                <p className="pt-1">{this.state.items.description}</p>
                                <div className="table-responsive">
                                    <table className="table table-sm table-borderless mb-0">
                                        <tbody>
                                        <tr>
                                            <th className="pl-0 w-25" scope="row"><strong>Brand</strong></th>
                                            <td>{this.state.items.brandsName}</td>
                                        </tr>
                                        <tr>
                                            <th className="pl-0 w-25" scope="row"><strong>{this.state.items.attribute1Name}</strong></th>
                                            <td>{this.state.items.attributeValueId1Name}</td>
                                        </tr>
                                        <tr>
                                            <th className="pl-0 w-25" scope="row"><strong>{this.state.items.attribute2Name}</strong></th>
                                            <td>{this.state.items.attributeValueId2Name}</td>
                                        </tr>
                                        <tr>
                                            <th className="pl-0 w-25" scope="row"><strong>{this.state.items.attribute3Name}</strong></th>
                                            <td>{this.state.items.attributeValueId3Name}</td>
                                        </tr>
                                        <tr>
                                            <th className="pl-0 w-25" scope="row"><strong>{this.state.items.attribute4Name}</strong></th>
                                            <td>{this.state.items.attributeValueId4Name}</td>
                                        </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <hr/>
                                <button type="button" className="btn btn-primary btn-md mr-1 mb-2">Add to cart &nbsp;<i className="fa fa-shopping-cart"></i></button>
                            </div>
                        </div>
                    </header>
                </div>
            </>
        );
    }
}