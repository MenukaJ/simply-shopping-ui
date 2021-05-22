import React, { Component } from "react";
import UserService from "../services/user.service";
import SideNavUserComponent from "./navigation/side-nav-comn.component";
//import SideNavUserComponent from "./navigation/side-nav-user.component";
import CategoryService from '../services/category.service';
import Table from 'react-bootstrap/Table';
import {InputGroup, FormControl, Button} from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: "",
      categories: [],
      currentPage : 1,
      recordsPerPage : 3
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
    CategoryService.getCategoryByStatus('ACTIVE').then(
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

  changePage = event => {
    this.setState({
      [event.target.name]: parseInt(event.target.value)
    });
  };

  firstPage = () => {
    if(this.state.currentPage > 1) {
      this.setState({
        currentPage: 1
      });
    }
  };

  prevPage = () => {
    if(this.state.currentPage > 1) {
      this.setState({
        currentPage: this.state.currentPage - 1
      });
    }
  };

  lastPage = () => {
    if(this.state.currentPage < Math.ceil(this.state.categories.length / this.state.recordsPerPage)) {
      this.setState({
        currentPage: Math.ceil(this.state.categories.length / this.state.recordsPerPage)
      });
    }
  };

  nextPage = () => {
    if(this.state.currentPage < Math.ceil(this.state.categories.length / this.state.recordsPerPage)) {
      this.setState({
        currentPage: this.state.currentPage + 1
      });
    }
  };

  render() {
    const {categories, currentPage, recordsPerPage} = this.state;
    const lastIndex = currentPage * recordsPerPage;
    const firstIndex = lastIndex - recordsPerPage;
    const currentRecords = categories.slice(firstIndex, lastIndex);
    const totalPages = Math.ceil(categories.length / recordsPerPage);
    const totalRecords = categories.length;

    const selectedPageCss = {
      width: "45px",
      border: "1px solid #FFFFFF",
      color: "#FFFFFF",
      textAlign: "center",
      fontWeight: "bold"
    };

    const pageCountLabelCss = {
      float: "left",
      width: "250px",
      border: "1px solid #FFFFFF",
      color: "#FFFFFF",
      textAlign: "center",
      fontWeight: "bold",
      padding: "10px 10px",
      background: "#17A2B8",
      borderRadius: "7px"
    };

    const recordCountLabelCss = {
      margin: "0 auto",
      width: "200px",
      border: "1px solid #FFFFFF",
      color: "#FFFFFF",
      textAlign: "center",
      fontWeight: "bold",
      padding: "10px 10px",
      background: "#17A2B8",
      borderRadius: "7px"
    };

    return (
        <>
          <SideNavUserComponent/>
          <div className="container">
            <header className="jumbotron">
              <h3>Our Store</h3><br/>
                <Table striped border hover variant="dark">
                  <tbody>
                  {categories.length === 0 ?
                      <tr align="center">
                        <td colSpan="6">No Categories Available</td>
                      </tr> :
                      currentRecords.map((category, index) => (
                          <tr>
                            <td key={index} rowspan = "3">
                              <div className="card" style={{width: '300px', color: 'black'}}>
                              <img className="card-img-top" src="http://cdn.mos.cms.futurecdn.net/6t8Zh249QiFmVnkQdCCtHK.jpg" alt="Card image" style={{width: '100%'}} />
                              <div className="card-body">
                                <center><Link className="btn btn-primary" to={`/item-front/${category.id}`}>{category.name} &nbsp; <i className="fa fa-arrow-circle-o-right"></i></Link></center>
                              </div>
                              </div>
                            </td>
                          </tr>
                      ))
                  }
                  </tbody>
                </Table>

              <div style={pageCountLabelCss}>
                Showing Page {currentPage} of {totalPages}
              </div>
              <div style={recordCountLabelCss}>
                Total Categories : {totalRecords}
              </div>
              <div style={{"float":"right"}}>
                <InputGroup size="sm">
                  <InputGroup.Prepend>
                    <Button type="button" variant="outline-info" disabled={currentPage === 1 ? true : false} onClick={this.firstPage}>
                      <i className="fa fa-fast-backward"></i> First
                    </Button>
                    <Button type="button" variant="outline-info" disabled={currentPage === 1 ? true : false} onClick={this.prevPage}>
                      <i className="fa fa-step-backward"></i> Prev
                    </Button>
                  </InputGroup.Prepend>
                  <FormControl style={selectedPageCss} className={"bg-primary"} name="currentPage" value={currentPage} onChange={this.changePage}/>
                  <InputGroup.Append>
                    <Button type="button" variant="outline-info" disabled={currentPage === totalPages ? true : false} onClick={this.nextPage}>
                      <i className="fa fa-step-forward"></i> Next
                    </Button>
                    <Button type="button" variant="outline-info" disabled={currentPage === totalPages ? true : false} onClick={this.lastPage}>
                      <i className="fa fa-fast-forward"></i>  Last
                    </Button>
                  </InputGroup.Append>
                </InputGroup>
              </div>
            </header>
          </div>
        </>
    );
  }
}
