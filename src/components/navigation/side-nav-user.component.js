import React, { Component } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import {Route} from "react-router-dom";
import AboutUs from "../about-us.component";
import ContactUs from "../contact-us.component";
import OurServices from "../our-services.component";
import PrivacyPolicy from "../privacy-policy.component";
import Faqs from "../faqs.component";

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
                    <a href="/"><i className="fa fa-gift"></i>&nbsp; Our Store</a>
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
export default SideNavUserComponent;