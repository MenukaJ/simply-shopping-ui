import React, { Component } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";


export class SideNavAdminComponent extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div>
                <div className="sidenav" >
                    <a href="/admin" ><i className="fa fa-dashboard"></i>&nbsp; Dashboard</a>
                    <a href="/category"><i className="fa fa-th-list"></i>&nbsp; Categories</a>
                    <a href="/brand"><i className="fa fa-gift"></i>&nbsp; Brands</a>
                    <a href="/attribute"><i className="fa fa-list-alt"></i>&nbsp; Attributes</a>
                    <a href="/attribute-value"><i className="fa fa-list-ol"></i>&nbsp; Attribute Values</a>
                    <a href="/item"><i className="fa fa-shopping-cart"></i>&nbsp; Items</a>
                    <a href="/item"><i className="fa fa-cc-visa"></i>&nbsp; Orders</a>
                    <a href="/item"><i className="fa fa-commenting-o"></i>&nbsp; Feedbacks</a>
                    <a href="/item"><i className="fa fa-user-secret"></i>&nbsp; Sellers</a>
                    <a href="/item"><i className="fa fa-users"></i>&nbsp; Buyers</a>
                </div>
            </div>
        );
    }
}
export default SideNavAdminComponent;