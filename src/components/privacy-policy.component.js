import React, { Component } from "react";

import UserService from "../services/user.service";
import SideNavUserComponent from "./navigation/side-nav-user.component";

export default class PrivacyPolicyComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            content: ""
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
    }

    render() {
        return (
            <>
                <SideNavUserComponent />
                <div className="container">
                    <header className="jumbotron">
                        <h3>Privacy Policy</h3>
                        <p>
                            Welcome to Cargills Online!
                            Cargills Foods Company (Private) Limited (‘Cargills’) owns and operates the website and the mobile application, CargillsOnline. We at Cargills, respect your privacy and values the trust you place in it. We strongly believe in transparency and are committed towards being upfront about our privacy practices while improving your shopping experience.

                            Mentioned herein under is our Privacy Policy which details the manner in which information relating to you is collected, used and/or disclosed. The Privacy Policy further explains your rights/options regarding the collection, use and disclosure of your personal information.

                            We shall only collect such information which is required and shall only use your personal information as clearly stated in this policy as your privacy is of utmost importance to us.

                            By accessing, downloading or using our website or mobile application you agree to be bound by our Privacy Policy. Do not use our Website, the mobile application and/or related online services if you disagree with our Privacy Policy.
                            You may visit the website/mobile application and browse without providing any personal information unless otherwise you choose to create an account by entering requested information with an intention to transact with our ecommerce platform.

                            The Privacy Policy is subject to change from time to time without prior notice, therefore it is strongly recommended that you periodically review the Privacy Policy posted on the website/ mobile application.

                            Should you have any clarifications with regard to the Privacy Policy, please do not hesitate to contact us at customerservice@cargillsonline.com

                            What information do we collect?
                            We may collect personal information including but not limited to the following about you, however not all information will be collected about every individual.

                            Personal identifiers such as name and address (location/postal code)
                            Online identifiers such as mobile number and email address
                            Government identifiers such as National ID card number or driver’s license
                            Demographic information such as age and date of birth
                            Internet, application and network activity such as cookie IDs and browser visits
                            Purchase history, products bought in the past
                            How to we collect the Information?
                            Information you disclose: We may collect information if you wish to create an account with us or when you modify your account with us, through surveys and opinion polls.

                            Automatic Information: We automatically collect and store certain types of information about your use of our ecommerce services, including information about your interaction with content and services. Like many websites, we use "cookies" and other unique identifiers, and we obtain certain types of information when your web browser or device accesses our services.

                            We are not responsible for privacy practices of the websites which is not owned, managed or controlled by us

                            How do we use the Information?
                            We will use your information to process your request orders and to provide you with the services and information offered through our website/ mobile application. We will use the same information to administer your account with us; verify and facilitate financial transactions, complete the selected payments you make; improve/customize the layout and/or content of the pages of our website; identify inbound visitors on our website; facilitate research on our users'; send the information which you have requested and we think that may find useful for you, including information about our products, services and promotions, provided you have indicated that you have not objected to being contacted for these purposes. If you prefer not to receive any direct marketing communications from us, you can opt out at any time.

                            We may use your information for opinion and market research. Your details will be anonymized and will only be used for statistical purposes.

                            * If you would prefer not to receive any of this additional information, please click the 'unsubscribe' link in any email that we send to you. Within 7 working days (days which are neither (i) a Sunday, nor (ii) a public holiday anywhere in Sri Lanka) of receipt of your instruction we will cease to send you information as requested. If your instruction is not clear, we will contact you for clarification

                            How we share your information?
                            We shall share your information in order to comply with the legal obligations.

                            We may share your information within our company and our subsidiaries and affiliated companies for the purposes of decision making, reporting, management, analysis, administer programs, promote service offerings and other business purposes. We may send you information related to the Cargills, CargillsOnline or related to our other websites, products, sales promotions, newsletters, anything relating to other companies in our group or our business partners.

                            We may share your name and address on to a third-party delivery agent in order to complete the delivery of the purchased product. In order to facilitate this function, you shall maintain the updated / accurate information at all times.

                            We may exchange information with third parties for the purposes of providing a superior delivery service, fraud protection and credit risk reduction. We may transfer our databases containing your personal information if we sell our business or part of it. Other than as set out in this Privacy Policy, we shall NOT sell or disclose your personal data to third parties without obtaining your prior consent unless this is necessary for the purposes set out in this Privacy Policy or unless we are required to do so by law. The website/ mobile application may contain advertising of third parties and links to other sites or frames of other sites. Please be aware that we are not responsible for the privacy practices or content of those third parties or other sites, nor for any third party to whom we transfer your data in accordance with our Privacy Policy.

                            How to access to your Data?
                            You may access and change your data including your personal data, purchase history by logging to the website/mobile application. There you can view the details of your orders that have been completed, those which are open and those which are shortly to be dispatched. You shall undertake to treat the personal access data confidentially and not make it available to unauthorized third parties. We cannot assume any liability for misuse of passwords unless this misuse is caused due to our internal fault.

                            Cookies
                            The acceptance of cookies is not a requirement for visiting the website/mobile application

                            Cookies can be used to recognize your Internet Protocol address, saving you time while you are on, or want to enter, the Site. We only use cookies for your convenience in using the Site (for example to remember who you are when you want to amend your shopping cart without having to re-enter your email address). Your browser can be set to not accept cookies, but this would restrict your use of the website/ mobile application. Please accept our assurance that our use of cookies does not contain any personal or private details and are free from viruses.

                            Please visit http://www.allaboutcookies.org, if you wish to obtain more information about cookies.

                            What are the Security measures in place?
                            We have established appropriate firewalls and other security control measures to prevent unauthorized or unlawful access to or accidental loss of or destruction or damage to your information We will update our systems, controls and operating procedures to offer you the maximum possible security controls in our Site. However, you shall be responsible to create and maintain a suitable password to the Site.

                            What are your rights?
                            If you are concerned about your data, you have the right to request access to the personal data which we may hold or process about you. You have the right to require us to correct any inaccuracies in your data anytime without any cost. Also, you have the right to ask us to refrain using your personal data for direct marketing purposes.
                        </p>
                    </header>
                </div>
            </>
        );
    }
}