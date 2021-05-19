import React, {Component} from "react";
import BootstrapTable from 'react-bootstrap-table-next';
import AttributeService from '../services/attribute.service';
import {Table, Button, ButtonToolbar} from 'react-bootstrap';
import filterFactory, {textFilter} from 'react-bootstrap-table2-filter';
import paginationFactory from 'react-bootstrap-table2-paginator';
import AddAttributeModel from './modal/add-attribute-modal.component';
import EditAttributeModel from './modal/edit-attribute-modal.component';
import DeleteAttributeModel from './modal/delete-attribute-modal.component';
import SideNavAdminComponent from "./navigation/side-nav-admin.component";

export class AttributeComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            attributes: [], columns: [{
                dataField: 'id',
                text: 'id',
                sort: true,
                //style: { padding: '0px', fontSize: '15px', margin: '0px'},
                headerStyle: (colum, colIndex) => {
                    return {padding: '5px', textAlign: 'center'};
                }
            },

                {
                    dataField: 'name',
                    text: 'Name',
                    //style: { padding: '0px', fontSize: '15px', margin: '0px'},
                    filter: textFilter(),
                    headerStyle: (colum, colIndex) => {
                        return {padding: '5px', textAlign: 'center'};
                    }

                }, {
                    dataField: 'status',
                    text: 'Status',
                    sort: true,
                    //style: { padding: '2px', fontSize: '15px', textAlign: 'center', margin: '0px'},
                    headerStyle: (colum, colIndex) => {
                        return {padding: '5px', textAlign: 'center'};
                    }
                },
                {
                    dataField: "",
                    text: "Edit",
                    formatter: this.updatePageLink,
                    sort: true,
                    //style: { fontSize: '15px'},
                    headerStyle: (column, colIndex) => {
                        return {padding: '5px', textAlign: 'center'};
                    }
                },
                {
                    dataField: "",
                    text: "Delete",
                    formatter: this.deletePageLink,
                    sort: true,
                    //style: { fontSize: '15px'},
                    headerStyle: (column, colIndex) => {
                        return {padding: '5px', textAlign: 'center'};
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


    updatePageLink = (cell, row, rowIndex, formatExtraData) => {
        return (
            <Button size="sm" variant='info'
                    onClick={() => {
                        this.setState({
                            editModalShow: true,
                            id: row.id,
                            name: row.name,
                            status: row.status
                        })
                    }
                    }>Edit
            </Button>
        );
    };

    deletePageLink = (cell, row, rowIndex, formatExtraData) => {
        return (
            <Button size="sm" variant='danger'
                    onClick={() => this.setState({
                        deleteModalShow: true,
                        id: row.id
                    })
                    }>Delete
            </Button>
        );
    };

    componentDidMount() {
        this.refreshList();
    }

    refreshList() {
        AttributeService.getAllAttributes().then(
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
        let AddModelClose = () => this.setState({addModalShow: false})
        let EditModelClose = () => this.setState({editModalShow: false})
        let DeleteModelClose = () => this.setState({deleteModalShow: false})
        return (
            <>
                <SideNavAdminComponent/>
                <div className="container" style={{
                    marginLeft: '15px',
                    paddingTop: '5px',
                    backgroundColor: '#ffffff',
                    boxShadow: '1px 2px 2px 2px rgba(0.3, 0.3, 0.3, 0.3)',
                    borderRadius: '5px'
                }}>
                    <header className="">
                        <div className="container">
                            <ButtonToolbar>
                                <h4 style={{color: "gray"}}>Attribute List</h4>&nbsp;&nbsp;&nbsp;&nbsp;
                                <Button variant='primary' size='sm'
                                        onClick={() => this.setState({addModalShow: true})}
                                >+ Add New Attribute
                                </Button>

                            </ButtonToolbar>
                            <AddAttributeModel
                                show={this.state.addModalShow}
                                onHide={AddModelClose}
                            />
                            <EditAttributeModel
                                show={this.state.editModalShow}
                                onHide={EditModelClose}
                                id={this.state.id}
                                name={this.state.name}
                                status={this.state.status}/>
                            <DeleteAttributeModel
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
                                    pagination={paginationFactory(options)}/>
                            </div>
                        </div>
                    </header>
                </div>
            </>
        )
    }
}

export default AttributeComponent