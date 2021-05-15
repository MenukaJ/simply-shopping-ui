import React, { Component } from "react";
import BootstrapTable from 'react-bootstrap-table-next';
import BrandService from '../services/brand.service';
import { Table, Button, ButtonToolbar } from 'react-bootstrap';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';
import paginationFactory from 'react-bootstrap-table2-paginator';
import AddBrandModel from './modal/add-brand-modal.component';
import EditBrandModel from './modal/edit-brand-modal.component';
import DeleteBrandModel from './modal/delete-brand-modal.component';
import SideNavAdminComponent from "./navigation/side-nav-admin.component";

export class BrandComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            attributes: [], columns: [{
                dataField: 'id',
                text: 'id',
                sort: true,
                //style: { padding: '0px', fontSize: '15px', margin: '0px'},
                headerStyle: (colum, colIndex) => {
                    return { padding: '5px', textAlign: 'center' };
                }
            },

            {
                dataField: 'name',
                text: 'Name',
                //style: { padding: '0px', fontSize: '15px', margin: '0px'},
                filter: textFilter(),
                headerStyle: (colum, colIndex) => {
                    return { padding: '5px', textAlign: 'center' };
                }

            }, {
                dataField: 'status',
                text: 'Status',
                sort: true,
                //style: { padding: '2px', fontSize: '15px', textAlign: 'center', margin: '0px'},
                headerStyle: (colum, colIndex) => {
                    return { padding: '5px', textAlign: 'center' };
                }
            },
            {
                dataField: "",
                text: "Action",
                formatter: this.linkFollow,
                sort: true,
                //style: { fontSize: '15px'},
                headerStyle: (colum, colIndex) => {
                    return { padding: '5px', textAlign: 'center' };
                }

            }
            ], addModalShow: false,
            editModalShow: false,
            deleteModalShow: false,
            id: '',
            name: '',
            status: '',
            data: {}
        };
    }


    linkFollow = (cell, row, rowIndex, formatExtraData) => {
        return (
            <ButtonToolbar className="mb-3">
                <Button size="sm" variant='success'
                    onClick={() => {
                        this.setState({ editModalShow: true, id: row.id, name: row.name, status: row.status })

                    }}

                >Edit
                </Button>&nbsp;
                <Button size="sm" variant='danger'
                    onClick={() => this.setState({ deleteModalShow: true, id: row.id })}
                >Delete
                </Button>

            </ButtonToolbar>

        );
    };

    componentDidMount() {
        this.refreshList();
    }

    refreshList() {
        BrandService.getAllBrand().then(
            response => {
                this.setState({
                    attributes: response.data
                });
            },
            error => {
                this.setState({
                    attributes:
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

        const options = {
            page: 0,
            sizePerPageList: [{
                text: '5', value: 5
            }, {
                text: '10', value: 10
            }, {
                text: 'All', value: this.state.attributes.length
            }],
            sizePerPage: 5,
            pageStartIndex: 0,
            paginationSize: 3,
            prePage: 'Prev',
            nextPage: 'Next',
            firstPage: 'First',
            lastPage: 'Last',
            paginationPosition: 'top'
        };
        let AddModelClose = () => this.setState({ addModalShow: false })
        let EditModelClose = () => this.setState({ editModalShow: false })
        let DeleteModelClose = () => this.setState({ deleteModalShow: false })
        return (
            <>
                <SideNavAdminComponent />
                <div className="container" style={{
                    marginLeft: '15px',

                    backgroundColor: '#ffffff',
                    boxShadow: '1px 2px 2px 2px rgba(0.3, 0.3, 0.3, 0.3)',
                    borderRadius: '5px'
                }}>
                    <header className="" >
                        <div className="container" >
                            <ButtonToolbar >
                                <Button variant='primary'
                                    onClick={() => this.setState({ addModalShow: true })}
                                >Add
                                </Button>

                            </ButtonToolbar>
                            <AddBrandModel
                                show={this.state.addModalShow}
                                onHide={AddModelClose}
                            />
                            <EditBrandModel
                                show={this.state.editModalShow}
                                onHide={EditModelClose}
                                id={this.state.id}
                                name={this.state.name}
                                status={this.state.status} />
                            <DeleteBrandModel
                                show={this.state.deleteModalShow}
                                onHide={DeleteModelClose}
                                id={this.state.id}
                            />
                            <div className="container" style={{
                                borderRadius: "10px",
                                padding: "10px",
                                backgroundColor: "white",
                                marginTop: "10px"
                            }
                            }>
                                <BootstrapTable
                                    keyField='id'
                                    striped
                                    hover
                                    data={this.state.attributes}
                                    columns={this.state.columns}
                                    filter={filterFactory()}
                                    pagination={paginationFactory(options)} />
                            </div>
                        </div>
                    </header>
                </div>
            </>
        )
    }
}

export default BrandComponent