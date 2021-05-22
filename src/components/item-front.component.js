import React, { Component } from "react";
import UserService from "../services/user.service";
import SideNavUserComponent from "./navigation/side-nav-user.component";
import CategoryService from '../services/category.service';
import ItemService from '../services/item.service';
import Table from 'react-bootstrap/Table';
import {InputGroup, FormControl, Button} from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default class ItemFrontComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            content: "",
            categories: [],
            items: [],
            currentPage : 1,
            recordsPerPage : 3,
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
        ItemService.getItemsByCategory(this.props.match.params.id).then(
            response => {
                this.setState({
                    items: response.data
                });
            },
            error => {
                this.setState({
                    items:
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
        if(this.state.currentPage < Math.ceil(this.state.items.length / this.state.recordsPerPage)) {
            this.setState({
                currentPage: Math.ceil(this.state.items.length / this.state.recordsPerPage)
            });
        }
    };

    nextPage = () => {
        if(this.state.currentPage < Math.ceil(this.state.items.length / this.state.recordsPerPage)) {
            this.setState({
                currentPage: this.state.currentPage + 1
            });
        }
    };

    render() {
        const {categories, items, currentPage, recordsPerPage} = this.state;
        const lastIndex = currentPage * recordsPerPage;
        const firstIndex = lastIndex - recordsPerPage;
        const currentRecords = items.slice(firstIndex, lastIndex);
        const totalPages = Math.ceil(items.length / recordsPerPage);
        const totalRecords = items.length;

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
                        <h3>Items List</h3><br/>
                        <Table striped border hover variant="dark">
                            <tbody>
                            {items.length === 0 ?
                                <tr align="center">
                                    <td colSpan="6">No Items Available</td>
                                </tr> :
                                currentRecords.map((item, index) => (
                                    <tr>
                                        <td key={index} rowspan = "3">
                                            <div className="card" style={{width: '300px', color: 'black'}}>
                                                <img className="card-img-top" src={item.url4} alt="Card image" style={{width: '100%', height : '250px'}} />
                                                <div className="card-body">
                                                    <h4 className="card-title">{item.name}</h4>
                                                    <p className="card-text">Rs {item.price}</p>
                                                    <center><Link className="btn btn-primary" to={`/item-front-view/${item.id}`}>{item.name} &nbsp; <i className="fa fa-arrow-circle-o-right"></i></Link></center>
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
                            Total Items : {totalRecords}
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
