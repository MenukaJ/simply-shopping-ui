import React, { Component } from 'react';
import { Modal, Button, Row, Col, Form, FormGroup, Alert } from 'react-bootstrap';
import CategoryService from '../../services/category.service';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import {storage} from "../../firebase";

export class EditCategoryModalComponent extends Component {
    constructor(props) {
        super(props);
        this.state = { snackbaropen: false, snackbarmsg: '',image:null, url:this.props.image, progress: 0 };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleImageChange = this.handleImageChange.bind(this);
    }

    snackbarClose = (event) => {
        this.setState({ snackbaropen: false });
    };

    handleImageChange = e => {
        if (e.target.files[0]) {
            const image = e.target.files[0];
            this.setState(() => ({ image }));
        }
    }

    handleImageUpload = () => {
        let { image } = this.state;

        if (image) {
            const uploadTask1 = storage.ref(`Category/${image.name}`).put(image);
            uploadTask1.on('state_changed',
                (snapshot) => {
                    const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
                    this.setState({ progress });
                },
                (error) => {
                    console.log(error);
                },
                () => {
                    storage.ref('Category').child(image.name).getDownloadURL().then(url => {
                        console.log(url);
                        this.setState({ url });
                    })
                });
        }
    };

    handleSubmit(event, props) {

        event.preventDefault();
        //alert(event.target.name.value);
        CategoryService.updateCategory(this.props.id, event.target.name.value, event.target.status.value, this.state.url).then(
            response => {
                if (response.message !== undefined) {
                    this.setState({ snackbaropen: true, snackbarmsg: response.message })
                }
                this.setState({ url: '' , progress:0})
            },
            error => {
                console.log(error);
                if (error.response.data.status !== undefined) {
                    this.setState({ snackbaropen: true, snackbarmsg: error.response.data.status, url:'', progress: 0 })
                } else if (error.response.data.name !== undefined) {
                    this.setState({ snackbaropen: true, snackbarmsg: error.response.data.name , url:'', progress: 0})
                }else if (error.response.data.message !== undefined) {
                    this.setState({ snackbaropen: true, snackbarmsg: error.response.data.message , url:'', progress: 0})
                } else {
                    this.setState({ snackbaropen: true, snackbarmsg: "failed", url:'', progress: 0 })
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
                <Modal
                    {...this.props}
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"

                >
                    <Modal.Header closeButton style={{background: '#5bc0de', color: 'white'}}>
                        <Modal.Title id="contained-modal-title-vcenter">
                            Update
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>

                        <Row>
                            <Col sm={6}>
                                <Form onSubmit={this.handleSubmit}>
                                    <Form.Group controlId="id">
                                        <Form.Label>ID</Form.Label>
                                        <Form.Control type="text" name="id" required disabled defaultValue={this.props.id} />
                                    </Form.Group>
                                    <Form.Group controlId="name">
                                        <Form.Label>Name</Form.Label>
                                        <Form.Control type="text" name="name" required placeholder="Category Name" defaultValue={this.props.name} />
                                    </Form.Group>
                                    <Form.Group controlId="image">
                                        <Form.Label>Name</Form.Label>
                                        <Form.Control type="file" name="image" required placeholder="Catrgory image url" onChange={this.handleImageChange} />
                                    </Form.Group>
                                    <Form.Group controlId="image">
                                        <input type="button" value="Upload" className="btn btn-success" onClick={this.handleImageUpload} />
                                    </Form.Group>
                                    <Form.Group controlId="image">
                                        <img src={this.state.url || this.props.image} alt="Uploaded images" height="100" width="160" /><br />
                                        <progress className="progress-bar progress-bar-striped bg-danger" role="progressbar" value={this.state.progress} max="100" />
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Label>Status</Form.Label>
                                        <Form.Control as="select" required name="status" defaultValue={this.props.status}>
                                            <option selected disabled>{this.props.status}</option>
                                            <option>ACTIVE</option>
                                            <option>INACTIVE</option>
                                        </Form.Control>
                                    </Form.Group>
                                    <Form.Group>
                                        <Button variant="primary" type="submit" >
                                            Update
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
export default EditCategoryModalComponent