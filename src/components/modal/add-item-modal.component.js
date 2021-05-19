import React, { Component } from 'react';
import { Modal, Button, Row, Col, Form} from 'react-bootstrap';
import ItemService from '../../services/item.service';
import CategoryService from '../../services/category.service';
import BrandService from '../../services/brand.service';
import AttributeValueService from '../../services/attribute-value.service';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import { storage } from '../../firebase';

export class AddItemModalComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            snackbaropen: false,
            snackbarmsg: '',
            categories: [],
            brands: [],
            attributeValues: [],
            image1: null,
            image2: null,
            image3: null,
            image4: null,
            url1: '',
            url2: '',
            url3: '',
            url4: '',
            progress1: 0,
            progress2: 0,
            progress3: 0,
            progress4: 0
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleImage1Change = this.handleImage1Change.bind(this);
        this.handleImage2Change = this.handleImage2Change.bind(this);
        this.handleImage3Change = this.handleImage3Change.bind(this);
        this.handleImage4Change = this.handleImage4Change.bind(this);
        this.handleImageUpload = this.handleImageUpload.bind(this);
    }

    componentDidMount() {
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
        BrandService.getBrandByStatus('ACTIVE').then(
            response => {
                this.setState({
                    brands: response.data
                });
            },
            error => {
                this.setState({
                    brands:
                        (error.response &&
                            error.response.data &&
                            error.response.data.message) ||
                        error.message ||
                        error.toString()
                });
            }
        );
        AttributeValueService.getAttributeValueByStatus('ACTIVE').then(
            response => {
                this.setState({
                    attributeValues: response.data
                });
            },
            error => {
                this.setState({
                    attributeValues:
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

    snackbarClose = (event) => {
        this.setState({ snackbaropen: false });
    };

    handleSubmit(event) {

        event.preventDefault();
        //alert(event.target.name.value);
        ItemService.addItem(event.target.categorysId.value,
            event.target.brandsId.value,
            event.target.name.value,
            event.target.description.value,
            event.target.quantity.value,
            event.target.attributeValueId1.value,
            event.target.attributeValueId2.value,
            event.target.attributeValueId3.value,
            event.target.attributeValueId4.value,
            event.target.image1.value,
            event.target.image2.value,
            event.target.image3.value,
            event.target.image4.value,
            event.target.price.value,
            event.target.discount.value,
            event.target.status.value).then(
            response => {
                if (response.message !== undefined) {
                    this.setState({snackbaropen: true, snackbarmsg: response.message})
                } else if (response.status !== undefined) {
                    this.setState({snackbaropen: true, snackbarmsg: response.status})
                } else if (response.name !== undefined) {
                    this.setState({snackbaropen: true, snackbarmsg: response.name})
                }
            },
            error => {
                console.log(error);
                this.setState({ snackbaropen: true, snackbarmsg: "failed" })

            }
        );
    }

    //***********image upload******************************

    handleImage1Change = e => {
        if (e.target.files[0]) {
            const image1 = e.target.files[0];
            this.setState(() => ({ image1 }));
        }
    }
    handleImage2Change = e => {
        if (e.target.files[0]) {
            const image2 = e.target.files[0];
            this.setState(() => ({ image2 }));
        }
    }
    handleImage3Change = e => {
        if (e.target.files[0]) {
            const image3 = e.target.files[0];
            this.setState(() => ({ image3 }));
        }
    }
    handleImage4Change = e => {
        if (e.target.files[0]) {
            const image4 = e.target.files[0];
            this.setState(() => ({ image4 }));
        }
    }
    handleImageUpload = () => {
        const { image1 } = this.state;
        const { image2 } = this.state;
        const { image3 } = this.state;
        const { image4 } = this.state;

        if (image1) {
            const uploadTask1 = storage.ref(`Items/${image1.name}`).put(image1);
            uploadTask1.on('state_changed',
                (snapshot) => {
                    const progress1 = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
                    this.setState({ progress1 });
                },
                (error) => {
                    console.log(error);
                },
                () => {
                    storage.ref('Items').child(image1.name).getDownloadURL().then(url1 => {
                        console.log(url1);
                        this.setState({ url1 });
                    })
                });
        }
        if (image2) {
            const uploadTask2 = storage.ref(`Items/${image2.name}`).put(image2);
            uploadTask2.on('state_changed',
                (snapshot) => {
                    const progress2 = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
                    this.setState({ progress2 });
                },
                (error) => {
                    console.log(error);
                },
                () => {
                    storage.ref('Items').child(image2.name).getDownloadURL().then(url2 => {
                        console.log(url2);
                        this.setState({ url2 });
                    })
                });
        }
        if (image3) {
            const uploadTask3 = storage.ref(`Items/${image3.name}`).put(image3);
            uploadTask3.on('state_changed',
                (snapshot) => {
                    const progress3 = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
                    this.setState({ progress3 });
                },
                (error) => {
                    console.log(error);
                },
                () => {
                    storage.ref('Items').child(image3.name).getDownloadURL().then(url3 => {
                        console.log(url3);
                        this.setState({ url3 });
                    })
                });
        }
        if (image4) {
            const uploadTask4 = storage.ref(`Items/${image4.name}`).put(image4);
            uploadTask4.on('state_changed',
                (snapshot) => {
                    const progress4 = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
                    this.setState({ progress4 });
                },
                (error) => {
                    console.log(error);
                },
                () => {
                    storage.ref('Items').child(image4.name).getDownloadURL().then(url4 => {
                        console.log(url4);
                        this.setState({ url4 });
                    })
                });
        }
    };

    render() {
        const {categories} = this.state;
        const {brands} = this.state;
        const {attributeValues} = this.state;
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
                    <Modal.Header closeButton style={{background: '#0275d8', color: 'white'}}>
                        <Modal.Title id="contained-modal-title-vcenter">Add New Item</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Row>
                            <div className="container">
                                <Form onSubmit={this.handleSubmit}>
                                    <div className="row">
                                        <div className="col">
                                            <Form.Group controlId="categorysId">
                                                <Form.Label>Category</Form.Label>
                                                <Form.Control as="select" required name="categorysId">
                                                    {categories.map((category) => (
                                                        <option value={category.id}>{category.name}</option>
                                                    ))}
                                                </Form.Control>
                                            </Form.Group>
                                        </div>
                                        <div className="col">
                                            <Form.Group controlId="brandsId">
                                                <Form.Label>Brand</Form.Label>
                                                <Form.Control as="select" required name="brandsId">
                                                    {brands.map((brand) => (
                                                        <option value={brand.id}>{brand.name}</option>
                                                    ))}
                                                </Form.Control>
                                            </Form.Group>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col">
                                            <Form.Group controlId="name">
                                                <Form.Label>Name</Form.Label>
                                                <Form.Control type="text" name="name" required placeholder="Name" />
                                            </Form.Group>
                                        </div>
                                        <div className="col">
                                            <Form.Group controlId="description">
                                                <Form.Label>Description</Form.Label>
                                                <Form.Control type="text" name="description" placeholder="Description" />
                                            </Form.Group>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col">
                                            <Form.Group controlId="quantity">
                                                <Form.Label>Quantity</Form.Label>
                                                <Form.Control type="text" name="quantity" placeholder="Quantity" />
                                            </Form.Group>
                                        </div>
                                        <div className="col">
                                            <Form.Group>
                                                <Form.Label>Status</Form.Label>
                                                <Form.Control as="select" required name="status">
                                                    <option selected>ACTIVE</option>
                                                    <option>INACTIVE</option>
                                                </Form.Control>
                                            </Form.Group>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col">
                                            <Form.Group controlId="attributeValueId1">
                                                <Form.Label>Attribute Value 1</Form.Label>
                                                <Form.Control as="select" required name="attributeValueId1">
                                                    {attributeValues.map((attributeValue1) => (
                                                        <option value={attributeValue1.id}>{attributeValue1.name}</option>
                                                    ))}
                                                </Form.Control>
                                            </Form.Group>
                                        </div>
                                        <div className="col">
                                            <Form.Group controlId="attributeValueId2">
                                                <Form.Label>Attribute Value 2</Form.Label>
                                                <Form.Control as="select" required name="attributeValueId2">
                                                    {attributeValues.map((attributeValue2) => (
                                                        <option value={attributeValue2.id}>{attributeValue2.name}</option>
                                                    ))}
                                                </Form.Control>
                                            </Form.Group>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col">
                                            <Form.Group controlId="attributeValueId3">
                                                <Form.Label>Attribute Value 3</Form.Label>
                                                <Form.Control as="select" required name="attributeValueId3">
                                                    {attributeValues.map((attributeValue3) => (
                                                        <option value={attributeValue3.id}>{attributeValue3.name}</option>
                                                    ))}
                                                </Form.Control>
                                            </Form.Group>
                                        </div>
                                        <div className="col">
                                            <Form.Group controlId="attributeValueId4">
                                                <Form.Label>Attribute Value 4</Form.Label>
                                                <Form.Control as="select" required name="attributeValueId4">
                                                    {attributeValues.map((attributeValue4) => (
                                                        <option value={attributeValue4.id}>{attributeValue4.name}</option>
                                                    ))}
                                                </Form.Control>
                                            </Form.Group>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col">
                                            <Form.Group controlId="price">
                                                <Form.Label>Price</Form.Label>
                                                <Form.Control type="text" name="price" required placeholder="Price" />
                                            </Form.Group>
                                        </div>
                                        <div className="col">
                                            <Form.Group controlId="discount">
                                                <Form.Label>Discount</Form.Label>
                                                <Form.Control type="text" name="discount" required placeholder="Discount" />
                                            </Form.Group>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col">
                                            <Form.Group controlId="image1">
                                                <Form.Label>Image 1</Form.Label>
                                            </Form.Group>
                                        </div>
                                        <div className="col-6">
                                            <Form.Group controlId="image1">
                                                <Form.Control type="file" className="btn btn-outline-light btn btn-light" onChange={this.handleImage1Change} />
                                            </Form.Group>
                                        </div>
                                        <div className="col">
                                            <Form.Group controlId="image1">
                                                <input type="button" value="Upload" className="btn btn-success" onClick={this.handleImageUpload} />
                                            </Form.Group>
                                        </div>
                                        <div className="col">
                                            <Form.Group controlId="image1">
                                                <img src={this.state.url1 || 'https://img.icons8.com/plasticine/452/apple-camera.png'} alt="Uploaded images" height="100" width="160" /><br />
                                                <progress className="progress-bar progress-bar-striped bg-danger" role="progressbar" value={this.state.progress1} max="100" />
                                            </Form.Group>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col">
                                            <Form.Group controlId="image2">
                                                <Form.Label>Image 2</Form.Label>
                                            </Form.Group>
                                        </div>
                                        <div className="col-6">
                                            <Form.Group controlId="image2">
                                                <Form.Control type="file" className="btn btn-outline-light btn btn-light" onChange={this.handleImage2Change} />
                                            </Form.Group>
                                        </div>
                                        <div className="col">
                                            <Form.Group controlId="image2">
                                                <input type="button" value="Upload" className="btn btn-success" onClick={this.handleImageUpload} />
                                            </Form.Group>
                                        </div>
                                        <div className="col">
                                            <Form.Group controlId="image2">
                                                <img src={this.state.url2 || 'https://img.icons8.com/plasticine/452/apple-camera.png'} alt="Uploaded images" height="100" width="160" /><br />
                                                <progress className="progress-bar progress-bar-striped bg-danger" role="progressbar" value={this.state.progress2} max="100" />
                                            </Form.Group>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col">
                                            <Form.Group controlId="image3">
                                                <Form.Label>Image 3</Form.Label>
                                            </Form.Group>
                                        </div>
                                        <div className="col-6">
                                            <Form.Group controlId="image3">
                                                <Form.Control type="file" className="btn btn-outline-light btn btn-light" onChange={this.handleImage3Change} />
                                            </Form.Group>
                                        </div>
                                        <div className="col">
                                            <Form.Group controlId="image3">
                                                <input type="button" value="Upload" className="btn btn-success" onClick={this.handleImageUpload} />
                                            </Form.Group>
                                        </div>
                                        <div className="col">
                                            <Form.Group controlId="image3">
                                                <img src={this.state.url3 || 'https://img.icons8.com/plasticine/452/apple-camera.png'} alt="Uploaded images" height="100" width="160" /><br />
                                                <progress className="progress-bar progress-bar-striped bg-danger" role="progressbar" value={this.state.progress3} max="100" />
                                            </Form.Group>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col">
                                            <Form.Group controlId="image4">
                                                <Form.Label>Image 4</Form.Label>
                                            </Form.Group>
                                        </div>
                                        <div className="col-6">
                                            <Form.Group controlId="image4">
                                                <Form.Control type="file" className="btn btn-outline-light btn btn-light" onChange={this.handleImage4Change} />
                                            </Form.Group>
                                        </div>
                                        <div className="col">
                                            <Form.Group controlId="image4">
                                                <input type="button" value="Upload" className="btn btn-success" onClick={this.handleImageUpload} />
                                            </Form.Group>
                                        </div>
                                        <div className="col">
                                            <Form.Group controlId="image4">
                                                <img src={this.state.url4 || 'https://img.icons8.com/plasticine/452/apple-camera.png'} alt="Uploaded images" height="100" width="160" /><br />
                                                <progress className="progress-bar progress-bar-striped bg-danger" role="progressbar" value={this.state.progress4} max="100" />
                                            </Form.Group>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col">
                                            <Form.Group>
                                                <Button variant="primary" type="submit" >Save</Button>
                                            </Form.Group>
                                        </div>
                                    </div>
                                </Form>
                            </div>
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
export default AddItemModalComponent