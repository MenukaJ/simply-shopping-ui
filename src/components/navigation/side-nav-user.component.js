import React, { Component } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";

export class SideNavUserComponent extends Component {
    constructor(props) {
        super(props);
    }
    handleRefresh = () => {
        // by calling this method react re-renders the component
        window.location.reload();
    };

    render() {
        return (
            <div>
                <div className="sidenav" >
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
                    <a href="#about">About</a>
                    <a href="#services">Services</a>
                    <a href="#clients">Clients</a>
                </div>
            </div>
        );
    }
}
export default SideNavUserComponent;