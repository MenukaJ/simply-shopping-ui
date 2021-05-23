import React, { Component } from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import "./dashboard.-styles.css";

import AuthService from "./services/auth.service";
import Login from "./components/login.component";
import Register from "./components/register.component";
import Home from "./components/home.component";
import Profile from "./components/profile.component";
import BoardUser from "./components/board-user.component";
import BoardAdmin from "./components/board-admin.component";
import Category from "./components/category.component";
import Brand from "./components/brand.component";
import Attribute from "./components/attribute.component";
import Item from "./components/item.component";
import AttributeValue from "./components/attribute-value.component";

import AboutUs from "./components/about-us.component";
import ContactUs from "./components/contact-us.component";
import OurServices from "./components/our-services.component";
import PrivacyPolicy from "./components/privacy-policy.component";
import Faqs from "./components/faqs.component";
import ItemFront from "./components/item-front.component";
import ItemFrontView from "./components/item-front-view.component";

class App extends Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);

    this.state = {
      showAdminBoard: false,
      currentUser: undefined,
    };
  }

  componentDidMount() {
    const user = AuthService.getCurrentUser();

    if (user) {
      this.setState({
        currentUser: user,
        showAdminBoard: user.roles.includes("ROLE_ADMIN"),
      });
    }
  }

  logOut() {
    AuthService.logout();
  }



  render() {
    const { currentUser, showAdminBoard, profileUrl } = this.state;

    return (
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <Link to={"/"} className="navbar-brand" >
            Simply Shopping
          </Link>
          <div className="navbar-nav mr-auto">
            {/* <li className="nav-item">
              <Link to={"/home"} className="nav-link">
                Home
              </Link>
            </li> */}

            {showAdminBoard && (
              <li className="nav-item">
                <Link to={"/admin"} className="nav-link" >
                  <i className="fa fa-user-secret"></i>&nbsp; Seller
                </Link>
              </li>
            )}

            {currentUser && (
              <li className="nav-item">
                <Link to={"/user"} className="nav-link" >
                  <i className="fa fa-user-circle-o"></i>&nbsp; Buyer
                </Link>
              </li>
            )}
          </div>

          {currentUser ? (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={ "/profile" } className="nav-link">
                  <i className="fa fa-user"></i>&nbsp; {currentUser.username}
                </Link>
              </li>
              <li className="nav-item">
                <a href="/login" className="nav-link" onClick={this.logOut}>
                  LogOut
                </a>
              </li>
            </div>
          ) : (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/login"} className="nav-link">
                  Login
                </Link>
              </li>

              <li className="nav-item">
                <Link to={"/register"} className="nav-link">
                  Sign Up
                </Link>
              </li>
            </div>
          )}
        </nav>


        <div className="main">
          <div className="container mt-3" style={{marginLeft:"30px"}}>
            <Switch>
              <Route exact path={["/", "/home"]} component={Home} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/register" component={Register} />
              <Route exact path="/profile" component={Profile} />
              <Route path="/user" component={BoardUser} />
              <Route path="/admin" component={BoardAdmin} />
              <Route path="/category" component={Category} />
              <Route path="/brand" component={Brand} />
              <Route path="/attribute" component={Attribute} />
              <Route path="/item" component={Item} />
              <Route path="/attribute-value" component={AttributeValue} />
              <Route path="/about-us" component={AboutUs} />
              <Route path="/contact-us" component={ContactUs} />
              <Route path="/our-services" component={OurServices} />
              <Route path="/privacy-policy" component={PrivacyPolicy} />
              <Route path="/faqs" component={Faqs} />
              <Route path="/item-front/:id" component={ItemFront} />
              <Route path="/item-front-view/:id" component={ItemFrontView} />

            </Switch>
          </div>
        </div>

      </div>
    );
  }
}

export default App;
