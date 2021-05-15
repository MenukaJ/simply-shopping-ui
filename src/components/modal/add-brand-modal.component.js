import React, { Component } from 'react';
import { Modal, Button, Row, Col, Form, FormGroup, Alert } from 'react-bootstrap';
import BrandService from '../../services/brand.service';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';

export class AddBrandModalComponent extends Component {
    constructor(props) {
        super(props);
        this.state = { snackbaropen: false, snackbarmsg: '' };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    snackbarClose = (event) => {
        this.setState({ snackbaropen: false });
    };

    handleSubmit(event) {

        event.preventDefault();
        //alert(event.target.name.value);
        BrandService.addBrand(event.target.name.value, event.target.status.value).then(
            response => {
                if (response.message !== undefined) {
                    this.setState({ snackbaropen: true, snackbarmsg: response.message })
                }
                else if (response.status !== undefined) {
                    this.setState({ snackbaropen: true, snackbarmsg: response.status })
                } else if (response.name !== undefined) {
                    this.setState({ snackbaropen: true, snackbarmsg: response.name })
                }
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
                <Modal
                    {...this.props}
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                //centered
                >
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter">
                            Save Brand
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>

                        <Row>
                            <Col sm={6}>
                                <Form onSubmit={this.handleSubmit}>
                                    <Form.Group controlId="name">
                                        <Form.Label>Name</Form.Label>
                                        <Form.Control type="text" name="name" required placeholder="Brand Name" />
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Label>Status</Form.Label>
                                        <Form.Control as="select" required name="status">
                                            <option selected>ACTIVE</option>
                                            <option>INACTIVE</option>
                                        </Form.Control>
                                    </Form.Group>
                                    <Form.Group>
                                        <Button variant="primary" type="submit" >
                                            Save
                                        </Button>
                                    </Form.Group>
                                </Form>
                            </Col>
                        </Row>

                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="danger" onClick={this.props.onHide}>Close</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}
export default AddBrandModalComponent