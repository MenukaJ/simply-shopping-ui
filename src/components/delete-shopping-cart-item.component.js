import React, { Component } from 'react';
import { Modal, Button, Row, Col, Form, FormGroup, Alert } from 'react-bootstrap';
import OrderService from '../services/order.service';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';

export class DeleteShoppingCartItemComponent extends Component {
    constructor(props) {
        super(props);
        this.state = { snackbaropen: false, snackbarmsg: '' };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    snackbarClose = (event) => {
        this.setState({ snackbaropen: false });
    };

    handleSubmit(event, props) {
        this.props.onHide();
        event.preventDefault();
        OrderService.deleteOrderItem(this.props.id).then(
            response => {
                if (response.message !== undefined) {
                    this.setState({snackbaropen: true, snackbarmsg: response.message})
                }
            },
            error => {
                console.log(error);
                if (error.response.data.message !== undefined) {
                    this.setState({snackbaropen: true, snackbarmsg: error.response.data.message})
                } else {
                    this.setState({ snackbaropen: true, snackbarmsg: "Failed to remove item!" })
                }
            }
        );

    }

    render() {
        return (
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
                <Modal {...this.props}>
                    <Modal.Header closeButton>
                        <Modal.Title>Do you want to remove this item ?</Modal.Title>
                    </Modal.Header>

                    <Modal.Footer>
                        <Button variant="primary" onClick={this.handleSubmit}>Yes</Button>
                        <Button variant="secondary" onClick={this.props.onHide}>No</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}
export default DeleteShoppingCartItemComponent