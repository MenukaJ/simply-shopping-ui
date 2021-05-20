import React, { Component } from "react";
import BootstrapTable from 'react-bootstrap-table-next';
import ItemService from '../services/item.service';
import { Table, Button, ButtonToolbar } from 'react-bootstrap';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';
import paginationFactory from 'react-bootstrap-table2-paginator';
import AddItemModel from './modal/add-item-modal.component';
import EditItemModel from './modal/edit-item-modal.component';
import DeleteItemModel from './modal/delete-item-modal.component';
import SideNavAdminComponent from "./navigation/side-nav-admin.component";

export class ItemComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            attributes: [],
            columns: [
                {
                    dataField: 'id',
                    text: 'Id',
                    sort: true,
                    //style: { padding: '0px', fontSize: '15px', margin: '0px'},
                    headerStyle: (column, colIndex) => {
                        return {padding: '5px', textAlign: 'center'};
                    }
                },
                {
                    dataField: 'name',
                    text: 'Name',
                    //style: { padding: '0px', fontSize: '15px', margin: '0px'},
                    filter: textFilter(),
                    headerStyle: (column, colIndex) => {
                        return {padding: '5px', textAlign: 'center'};
                    }
                },
                {
                    dataField: 'status',
                    text: 'Status',
                    sort: true,
                    //style: { padding: '2px', fontSize: '15px', textAlign: 'center', margin: '0px'},
                    headerStyle: (column, colIndex) => {
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
            ],
            addModalShow: false,
            editModalShow: false,
            deleteModalShow: false,
            id: '',
            categorysId: '',
            categorysName: '',
            brandsId: '',
            brandsName: '',
            name: '',
            description: '',
            quantity: '',
            attributeValueId1: '',
            attributeValueId1Name: '',
            attributeValueId2: '',
            attributeValueId2Name: '',
            attributeValueId3: '',
            attributeValueId3Name: '',
            attributeValueId4: '',
            attributeValueId4Name: '',
            image1: '',
            image2: '',
            image3: '',
            image4: '',
            price: '',
            discount: '',
            status: '',
            data: {}
            // isFollow: true
        };
        //this.onFollowChanged.bind(this);
    }

    updatePageLink = (cell, row, rowIndex, formatExtraData) => {
        return (
            <Button size="sm" variant='info'
                    onClick={() => {
                            this.setState({
                                editModalShow: true,
                                id: row.id,
                                categorysId: row.categorysId,
                                categorysName: row.categorysName,
                                brandsId: row.brandsId,
                                brandsName: row.brandsName,
                                name: row.name,
                                description: row.description,
                                quantity: row.quantity,
                                attributeValueId1: row.attributeValueId1,
                                attributeValueId1Name: row.attributeValueId1Name,
                                attributeValueId2: row.attributeValueId2,
                                attributeValueId2Name: row.attributeValueId2Name,
                                attributeValueId3: row.attributeValueId3,
                                attributeValueId3Name: row.attributeValueId3Name,
                                attributeValueId4: row.attributeValueId4,
                                attributeValueId4Name: row.attributeValueId4Name,
                                image1: row.image1,
                                image2: row.image2,
                                image3: row.image3,
                                image4: row.image4,
                                price: row.price,
                                discount: row.discount,
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
        ItemService.getAllItems().then(
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
            sizePerPageList: [
                    {
                        text: '5', value: 5
                    },
                    {
                        text: '10', value: 10
                    },
                    {
                        text: 'All', value: this.state.attributes.length
                    }
                ],
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
        //const {data, id, name, status } = this.state;
        return (
            <>
                <SideNavAdminComponent />
                <div className="container" style={{
                    //border: "5px solid black",
                    marginLeft: '15px',
                    backgroundColor: '#ffffff',
                    boxShadow: '1px 2px 2px 2px rgba(0.3, 0.3, 0.3, 0.3)',
                    borderRadius: '5px'
                }}>
                    <header className="" >
                        <br/>
                        <div className="container" style={{background : '#ccccff', borderRadius : '8px'}}>
                            <br/>
                            <ButtonToolbar >
                                <h4>Items List</h4>&nbsp;&nbsp;&nbsp;&nbsp;
                                <Button variant='primary'
                                        onClick={() => this.setState({
                                            addModalShow: true
                                        })
                                        }>+ Add New Item
                                </Button>
                            </ButtonToolbar>

                            <AddItemModel
                                show={this.state.addModalShow}
                                onHide={AddModelClose} />
                            <EditItemModel
                                show={this.state.editModalShow}
                                onHide={EditModelClose}
                                id={this.state.id}
                                categorysId={this.state.categorysId}
                                categorysName={this.state.categorysName}
                                brandsId={this.state.brandsId}
                                brandsName={this.state.brandsName}
                                name={this.state.name}
                                description={this.state.description}
                                quantity={this.state.quantity}
                                attributeValueId1={this.state.attributeValueId1}
                                attributeValueId1Name={this.state.attributeValueId1Name}
                                attributeValueId2={this.state.attributeValueId2}
                                attributeValueId2Name={this.state.attributeValueId2Name}
                                attributeValueId3={this.state.attributeValueId3}
                                attributeValueId3Name={this.state.attributeValueId3Name}
                                attributeValueId4={this.state.attributeValueId4}
                                attributeValueId4Name={this.state.attributeValueId4Name}
                                image1={this.state.image1}
                                image2={this.state.image2}
                                image3={this.state.image3}
                                image4={this.state.image4}
                                price={this.state.price}
                                discount={this.state.discount}
                                status={this.state.status} />
                            <DeleteItemModel
                                show={this.state.deleteModalShow}
                                onHide={DeleteModelClose}
                                id={this.state.id} />
                            <div className="container" style={{
                                //border: "5px solid black",
                                borderRadius: "10px",
                                padding: "10px",
                                backgroundColor: "white",
                                marginTop: "10px"
                            }}>
                                <BootstrapTable
                                    keyField='id'
                                    striped
                                    hover
                                    //rowStyle={ { backgroundColor: 'white' }}
                                    data={this.state.attributes}
                                    columns={this.state.columns}
                                    filter={filterFactory()}
                                    pagination={paginationFactory(options)} />
                            </div>
                            <br/>
                        </div>
                        <br/>
                    </header>
                </div>
            </>
        )
    }
}

export default ItemComponent