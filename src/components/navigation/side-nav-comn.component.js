import React, { Component } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import CategoryService from '../../services/category.service';
import {Form} from "react-bootstrap";
import EditCategoryModel from "../modal/edit-category-modal.component";

export class SideNavComnComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            categories: []
        };
    }
    handleRefresh = () => {
        // by calling this method react re-renders the component
        window.location.reload();
    };
    componentDidMount() {
        this.refreshList();
    }

    refreshList() {
        CategoryService.getAllCategory().then(
            response => {
                this.setState({
                    categories: response.data
                });
            },
            error => {
                this.setState({
                    categories:
                        (error.response &&
                            error.response.data &&
                            error.response.data.message) ||
                        error.message ||
                        error.toString()
                });
            }
        );
    }

    componentDidUpdate() {
        //this.refreshList();
    }

    render() {
        const {categories} = this.state;
        return (
            <div>

                <div className="sidenav" >
                    <a href="/"><i className="fa fa-gift"></i>&nbsp; Our Store</a>
                    <button className="dropdown-btn">Categories
                        <i className="fa fa-caret-down"></i>
                    </button>
                    <div className="dropdown-container">
                        {categories.length > 0 ? categories.map(category =>
                            <a href={'/item-front/'+category.id}>&nbsp; {category.name}</a>
                        ) : <a></a>}
                    </div>
                    <a href="/about-us"><i className="fa fa-home"></i>&nbsp; About Us</a>
                    <a href="/contact-us"><i className="fa fa fa-phone"></i>&nbsp; Contact Us</a>
                    <a href="/our-services"><i className="fa fa-handshake-o"></i>&nbsp; Our Services</a>
                    <a href="/privacy-policy"><i className="fa fa-book"></i>&nbsp; Privacy Policy</a>
                    <a href="/faqs"><i className="fa fa-question-circle"></i>&nbsp; FAQs</a>
                    <a href="/item-front"><i className="fa fa-question-circle"></i>&nbsp; Item Front</a>
                </div>
            </div>
        );
    }
}
export default SideNavComnComponent;