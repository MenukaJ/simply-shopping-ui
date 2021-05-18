import React, { Component } from 'react';
import { Modal, Button, Row, Col, Form, FormGroup,Alert } from 'react-bootstrap';
import AttributeService from '../../services/attribute.service';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';

export class DeleteAttributeModalComponent extends Component {
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
        //alert(event.target.name.value);
        AttributeService.deleteAttributesById(this.props.id).then(
            response => {
                    this.setState({ snackbaropen: true, snackbarmsg: response.message })
            },
            error => {
                console.log(error);
                this.setState({ snackbaropen: true, snackbarmsg: "failed" })
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
                    <Modal.Header closeButton style={{background: '#d9534f', color: 'white'}}>
                        <Modal.Title>Are you sure delete?</Modal.Title>
                    </Modal.Header>

                    <Modal.Footer>
                        <Button variant="primary" onClick={this.handleSubmit}>
                            Yes
                        </Button>
                        <Button variant="secondary" onClick={this.props.onHide}>
                            No
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}
export default DeleteAttributeModalComponent