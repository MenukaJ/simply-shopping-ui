import React, { Component } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";


export class SideNavAdminComponent extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div>
                <div className="sidenav">
                    <a href="/admin">Dashbord</a>
                    <a href="/category">Category</a>
                    <a href="/brand">Brand</a>
                    <a href="/attribute">Attribute</a>
                    <a href="/attribute-value">Attribute Value</a>

                    <button className="dropdown-btn">Dropdown
                        <i className="fa fa-caret-down"></i>
                    </button>
                    <div className="dropdown-container">
                        <a href="#">Link 1</a>
                        <a href="#">Link 2</a>
                        <a href="#">Link 3</a>
                    </div>
                    <button className="dropdown-btn">Dropdown
                        <i className="fa fa-caret-down"></i>
                    </button>
                    <div className="dropdown-container">
                        <a href="#">Link 1</a>
                        <a href="#">Link 2</a>
                        <a href="#">Link 3</a>
                    </div>
                    <button className="dropdown-btn">Dropdown
                        <i className="fa fa-caret-down"></i>
                    </button>
                    <div className="dropdown-container">
                        <a href="#">Link 1</a>
                        <a href="#">Link 2</a>
                        <a href="#">Link 3</a>
                    </div>
                </div>
            </div>
        );
    }
}
export default SideNavAdminComponent;