import React, { Component } from 'react';
import {Modal, Button, Row, Col, Form, FormGroup, FormLabel} from 'react-bootstrap';
import SellerService from '../../services/seller.service';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import { storage } from '../../firebase';

export class AddSellerModalComponent extends Component {
    constructor(props) {
        super(props);
        this.state={
            snackbaropen: false,
            snackbarmsg: ''}
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {

        event.preventDefault();
        SellerService.addSeller(event.target.firstName.value,
            event.target.lastName.value,
            event.target.fullName.value,
            event.target.addressLine1.value,
            event.target.addressLine2.value,
            event.target.addressLine3.value,
            event.target.email.value,
            event.target.mobile.value,
            event.target.landline.value,
            event.target.userId.value,
            event.target.nic.value,
            event.target.dob.value,
            event.target.status.value).then(
            response => {
                if (response.message !== undefined) {
                    this.setState({snackbaropen: true, snackbarmsg: response.message})
                }
            },
            error => {
                console.log(error);
                if (error.response.data.message !== undefined) {
                    this.setState({snackbaropen: true, snackbarmsg: error.response.data.message})
                } else if (error.response.data.price !== undefined) {
                    this.setState({snackbaropen: true, snackbarmsg: error.response.data.price})
                } else if (error.response.data.discount !== undefined) {
                    this.setState({snackbaropen: true, snackbarmsg: error.response.data.discount})
                } else {
                    this.setState({snackbaropen: true, snackbarmsg: "Failed to save!"})
                }
            }
        );
    }

    snackbarClose = (event) => {
        this.setState({ snackbaropen: false });
    };

    render() {
        return(
            <div className="container">
                <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                          open={this.state.snackbaropen}
                          autoHideDuration={6000}
                          onClose={this.snackbarClose}
                          message={<span id="message-id">{this.state.snackbarmsg}</span>}
                          action={[
                              <IconButton key="close" aria-label="Close" color="secondary" onClick={this.snackbarClose}></IconButton>
                          ]}
                />
                <Modal
                    {...this.props}
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    //centered
                >
                    <Modal.Header closeButton style={{background: '#0275d8', color: 'white'}}>
                        <Modal.Title id="contained-modal-title-vcenter">Add Seller Details</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="container">
                            <Form onSubmit={this.handleSubmit}>
                                <div className="row">
                                    <div className="col">
                                        <FormGroup controlId="firstName">
                                            <FormLabel>First Name</FormLabel>
                                            <Form.Control required name="firstName" ></Form.Control>
                                        </FormGroup>
                                    </div>
                                    <div className="col">
                                        <FormGroup controlId="lastName">
                                            <FormLabel>Last Name</FormLabel>
                                            <Form.Control required name="lastName" ></Form.Control>
                                        </FormGroup>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col">
                                        <FormGroup controlId="fullName">
                                            <FormLabel>Full Name</FormLabel>
                                            <Form.Control required name="fullName" ></Form.Control>
                                        </FormGroup>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col">
                                        <FormGroup controlId="addressLine1">
                                            <FormLabel>Address Line 1</FormLabel>
                                            <Form.Control required name="addressLine1" ></Form.Control>
                                        </FormGroup>
                                    </div>
                                    <div className="col">
                                        <FormGroup controlId="addressLine2">
                                            <FormLabel>Address Line 2</FormLabel>
                                            <Form.Control required name="addressLine2" ></Form.Control>
                                        </FormGroup>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col">
                                        <FormGroup controlId="addressLine3">
                                            <FormLabel>Address Line 3</FormLabel>
                                            <Form.Control required name="addressLine3" ></Form.Control>
                                        </FormGroup>
                                    </div>
                                    <div className="col">
                                        <FormGroup controlId="email">
                                            <FormLabel>Email</FormLabel>
                                            <Form.Control required name="email" ></Form.Control>
                                        </FormGroup>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col">
                                        <FormGroup controlId="mobile">
                                            <FormLabel>Mobile No</FormLabel>
                                            <Form.Control required name="mobile" ></Form.Control>
                                        </FormGroup>
                                    </div>
                                    <div className="col">
                                        <FormGroup controlId="landline">
                                            <FormLabel>Landline No</FormLabel>
                                            <Form.Control required name="landline" ></Form.Control>
                                        </FormGroup>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col">
                                        <FormGroup controlId="userId">
                                            <FormLabel>User ID</FormLabel>
                                            <Form.Control required name="userId" disabled defaultValue={ this.props.currentUser.id }></Form.Control>
                                        </FormGroup>
                                    </div>
                                    <div className="col">
                                        <FormGroup controlId="nic">
                                            <FormLabel>NIC No</FormLabel>
                                            <Form.Control required name="nic" ></Form.Control>
                                        </FormGroup>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col">
                                        <FormGroup controlId="dob">
                                            <FormLabel>Date of Birth</FormLabel>
                                            <Form.Control required name="dob" ></Form.Control>
                                        </FormGroup>
                                    </div>
                                    <div className="col">
                                        <FormGroup controlId="status">
                                            <FormLabel>Status</FormLabel>
                                            <Form.Control required name="status" ></Form.Control>
                                        </FormGroup>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col">
                                        <Form.Group>
                                            <Button variant="primary" type="submit" >Update</Button>
                                        </Form.Group>
                                    </div>
                                </div>
                            </Form>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="danger" onClick={this.props.onHide}>Close</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}

export default AddSellerModalComponent