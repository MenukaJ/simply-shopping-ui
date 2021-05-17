import React, {Component} from "react";
import Category from "./category.component"
import UserService from "../services/user.service";
import SideNavAdminComponent from "./navigation/side-nav-admin.component";

export default class BoardAdmin extends Component {
    constructor(props) {
      super(props);
      this.state = {
        content: {},
        totalItems: '',
        totalCategories: '',
        totalBrands: '',
        totalSellers: '',
        totalBuyers: '',
        totalOrders: ''
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
                <SideNavAdminComponent/>
                <div className="container">
                    <header className="jumbotron">
                        <h3>Main Dashboard</h3><br/>
                        <div className="row ">
                            <div className="col-md-3">
                                <div className="card-counter items">
                                    <i className="fa fa-shopping-cart"></i>
                                    <span className="count-numbers"><h1>{this.state.content.totalItems}</h1></span>
                                    <span className="count-name">Items</span>
                                </div>
                            </div>

                            <div className="col-md-3">
                                <div className="card-counter categories">
                                    <i className="fa fa-th-list"></i>
                                  <span className="count-numbers"><h1>{this.state.content.totalCategories}</h1></span>
                                  <span className="count-name">Categories</span>
                                </div>
                            </div>

                            <div className="col-md-3">
                                <div className="card-counter brands">
                                    <i className="fa fa-gift"></i>
                                  <span className="count-numbers"><h1>{this.state.content.totalBrands}</h1></span>
                                  <span className="count-name">Brands</span>
                                </div>
                            </div>

                            <div className="col-md-3">
                                <div className="card-counter sellers">
                                    <i className="fa fa-user-secret"></i>
                                  <span className="count-numbers"><h1>{this.state.content.totalSellers}</h1></span>
                                  <span className="count-name">Sellers</span>
                                </div>
                            </div>
                        </div><br/>
                        <div className="row ">
                            <div className="col-md-3">
                                <div className="card-counter buyers">
                                    <i className="fa fa-users"></i>
                                  <span className="count-numbers"><h1>{this.state.content.totalBuyers}</h1></span>
                                  <span className="count-name">Buyers</span>
                                </div>
                            </div>

                            <div className="col-md-3">
                                <div className="card-counter orders">
                                    <i className="fa fa-money"></i>
                                  <span className="count-numbers"><h1>{this.state.content.totalOrders}</h1></span>
                                  <span className="count-name">Orders</span>
                                </div>
                            </div>

                            <div className="col-md-3">
                                <div className="card-counter deliveries">
                                    <i className="fa fa-truck"></i>
                                    <span className="count-numbers"><h1>{this.state.content.totalItems}</h1></span>
                                    <span className="count-name">Deliveries</span>
                                </div>
                            </div>

                            <div className="col-md-3">
                                <div className="card-counter complains">
                                    <i className="fa fa-frown-o"></i>
                                    <span className="count-numbers"><h1>{this.state.content.totalItems}</h1></span>
                                    <span className="count-name">Complains</span>
                                </div>
                            </div>
                        </div>
                    </header>
                </div>
            </>
        );
    }
}
