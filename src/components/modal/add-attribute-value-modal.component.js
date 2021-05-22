import React, {Component} from 'react';
import {Modal, Button, Row, Col, Form, FormGroup, Alert} from 'react-bootstrap';
import AttributeValueService from '../../services/attribute-value.service';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import AttributeService from '../../services/attribute.service';

export class AddAttributeValueModalComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {snackbaropen: false, snackbarmsg: '', attributes: []};
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    snackbarClose = (event) => {
        this.setState({snackbaropen: false});
    };

    componentDidMount() {
        this.refreshList();
    }

    refreshList() {
        AttributeService.getAttributesByStatus("ACTIVE").then(
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

    handleSubmit(event) {

        event.preventDefault();
        //alert(event.target.name.value);
        AttributeValueService.addAttributeValue(event.target.name.value, event.target.status.value, event.target.attributesId.value).then(
            response => {
                if (response.message !== undefined) {
                    this.setState({snackbaropen: true, snackbarmsg: response.message})
                }
            },
            error => {
                if (error.response.data.status !== undefined) {
                    this.setState({ snackbaropen: true, snackbarmsg: error.response.data.status })
                } else if (error.response.data.name !== undefined) {
                    this.setState({ snackbaropen: true, snackbarmsg: error.response.data.name })
                }else if (error.response.data.message !== undefined) {
                    this.setState({ snackbaropen: true, snackbarmsg: error.response.data.message })
                }else if (error.response.data.attributesId !== undefined) {
                    this.setState({ snackbaropen: true, snackbarmsg: error.response.data.attributesId })
                } else {
                    this.setState({ snackbaropen: true, snackbarmsg: "failed to Save" })
                }
            }
        );
    }

    render() {
        const {attributes} = this.state;
        return (
            <div className="container">
                <Snackbar anchorOrigin={{vertical: 'top', horizontal: 'center'}}
                          open={this.state.snackbaropen}
                          autoHideDuration={6000}
                          onClose={this.snackbarClose}
                          message={<span id="message-id">{this.state.snackbarmsg}</span>}
                          action={[
                              <IconButton key="close" aria-label="Close" color="secondary"
                                          onClick={this.snackbarClose}></IconButton>
                          ]}
                />
                <Modal
                    {...this.props}
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    //centered
                >
                    <Modal.Header closeButton style={{background: '#0275d8', color: 'white'}}>
                        <Modal.Title id="contained-modal-title-vcenter">
                            Save Attribute
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>

                        <Row>
                            <Col sm={6}>
                                <Form onSubmit={this.handleSubmit}>
                                    <Form.Group>
                                        <Form.Label>Attribute</Form.Label>
                                        <Form.Control as="select" required name="attributesId">
                                            {attributes.length > 0 ? attributes.map(attribute =>
                                                <option value={attribute.id}>{attribute.name}</option>
                                            ) : <option></option>}
                                        </Form.Control>
                                    </Form.Group>
                                    <Form.Group controlId="name">
                                        <Form.Label>Name</Form.Label>
                                        <Form.Control type="text" name="name" required placeholder="Attribute Name"/>
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Label>Status</Form.Label>
                                        <Form.Control as="select" required name="status">
                                            <option selected>ACTIVE</option>
                                            <option>INACTIVE</option>
                                        </Form.Control>
                                    </Form.Group>
                                    <Form.Group>
                                        <Button variant="primary" type="submit">
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

export default AddAttributeValueModalComponent