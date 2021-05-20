import React, { Component } from "react";
import UserService from "../services/user.service";
import SideNavUserComponent from "./navigation/side-nav-user.component";

export default class Home extends Component {
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
          <SideNavUserComponent/>
          <div className="container">
            <header className="jumbotron">
              <h3>Our Store</h3>
              <div className="row ">
                <div className="col">
                  <div className="card" style={{width: '300px'}}>
                    <img className="card-img-top" src="http://cdn.mos.cms.futurecdn.net/6t8Zh249QiFmVnkQdCCtHK.jpg" alt="Card image" style={{width: '100%'}} />
                    <div className="card-body">
                      <h4 className="card-title">Name</h4>
                      <p className="card-text">Price : 2000.00</p>
                      <a href="#" className="btn btn-primary">Add to Cart</a>
                    </div>
                  </div>
                </div>

                <div className="col">
                  <div className="card" style={{width: '300px'}}>
                    <img className="card-img-top" src="http://cdn.mos.cms.futurecdn.net/6t8Zh249QiFmVnkQdCCtHK.jpg" alt="Card image" style={{width: '100%'}} />
                    <div className="card-body">
                      <h4 className="card-title">Name</h4>
                      <p className="card-text">Price : 2000.00</p>
                      <a href="#" className="btn btn-primary">Add to Cart</a>
                    </div>
                  </div>
                </div>

                <div className="col">
                  <div className="card" style={{width: '300px'}}>
                    <img className="card-img-top" src="http://cdn.mos.cms.futurecdn.net/6t8Zh249QiFmVnkQdCCtHK.jpg" alt="Card image" style={{width: '100%'}} />
                    <div className="card-body">
                      <h4 className="card-title">Name</h4>
                      <p className="card-text">Price : 2000.00</p>
                      <a href="#" className="btn btn-primary">Add to Cart</a>
                    </div>
                  </div>
                </div>
              </div><br/>
              <div className="row ">
                <div className="col">
                  <div className="card" style={{width: '300px'}}>
                    <img className="card-img-top" src="http://cdn.mos.cms.futurecdn.net/6t8Zh249QiFmVnkQdCCtHK.jpg" alt="Card image" style={{width: '100%'}} />
                    <div className="card-body">
                      <h4 className="card-title">Name</h4>
                      <p className="card-text">Price : 2000.00</p>
                      <a href="#" className="btn btn-primary">Add to Cart</a>
                    </div>
                  </div>
                </div>

                <div className="col">
                  <div className="card" style={{width: '300px'}}>
                    <img className="card-img-top" src="http://cdn.mos.cms.futurecdn.net/6t8Zh249QiFmVnkQdCCtHK.jpg" alt="Card image" style={{width: '100%'}} />
                    <div className="card-body">
                      <h4 className="card-title">Name</h4>
                      <p className="card-text">Price : 2000.00</p>
                      <a href="#" className="btn btn-primary">Add to Cart</a>
                    </div>
                  </div>
                </div>

                <div className="col">
                  <div className="card" style={{width: '300px'}}>
                    <img className="card-img-top" src="http://cdn.mos.cms.futurecdn.net/6t8Zh249QiFmVnkQdCCtHK.jpg" alt="Card image" style={{width: '100%'}} />
                    <div className="card-body">
                      <h4 className="card-title">Name</h4>
                      <p className="card-text">Price : 2000.00</p>
                      <a href="#" className="btn btn-primary">Add to Cart</a>
                    </div>
                  </div>
                </div>
              </div><br/>
              <div className="row ">
                <div className="col">
                  <div className="card" style={{width: '300px'}}>
                    <img className="card-img-top" src="http://cdn.mos.cms.futurecdn.net/6t8Zh249QiFmVnkQdCCtHK.jpg" alt="Card image" style={{width: '100%'}} />
                    <div className="card-body">
                      <h4 className="card-title">Name</h4>
                      <p className="card-text">Price : 2000.00</p>
                      <a href="#" className="btn btn-primary">Add to Cart</a>
                    </div>
                  </div>
                </div>

                <div className="col">
                  <div className="card" style={{width: '300px'}}>
                    <img className="card-img-top" src="http://cdn.mos.cms.futurecdn.net/6t8Zh249QiFmVnkQdCCtHK.jpg" alt="Card image" style={{width: '100%'}} />
                    <div className="card-body">
                      <h4 className="card-title">Name</h4>
                      <p className="card-text">Price : 2000.00</p>
                      <a href="#" className="btn btn-primary">Add to Cart</a>
                    </div>
                  </div>
                </div>

                <div className="col">
                  <div className="card" style={{width: '300px'}}>
                    <img className="card-img-top" src="http://cdn.mos.cms.futurecdn.net/6t8Zh249QiFmVnkQdCCtHK.jpg" alt="Card image" style={{width: '100%'}} />
                    <div className="card-body">
                      <h4 className="card-title">Name</h4>
                      <p className="card-text">Price : 2000.00</p>
                      <a href="#" className="btn btn-primary">Add to Cart</a>
                    </div>
                  </div>
                </div>
              </div>
            </header>
          </div>
        </>
    );
  }
}
