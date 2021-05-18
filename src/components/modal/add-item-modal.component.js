import React, { Component } from 'react';
import { Modal, Button, Row, Col, Form} from 'react-bootstrap';
import ItemService from '../../services/item.service';
import CategoryService from '../../services/category.service';
import BrandService from '../../services/brand.service';
import AttributeValueService from '../../services/attribute-value.service';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';

export class AddItemModalComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            snackbaropen: false,
            snackbarmsg: '',
            categories: [],
            brands: [],
            attributeValues: []
        };
        this.handleSubmit = this.handleSubmit.bind(this);
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
                            <Col sm={6}>
                                <Form onSubmit={this.handleSubmit}>
                                    <Form.Group controlId="categorysId">
                                        <Form.Label>Category</Form.Label>
                                        <Form.Control as="select" required name="categorysId">
                                            {categories.map((category) => (
                                                <option value={category.id}>{category.name}</option>
                                            ))}
                                        </Form.Control>
                                    </Form.Group>
                                    <Form.Group controlId="brandsId">
                                        <Form.Label>Brand</Form.Label>
                                        <Form.Control as="select" required name="brandsId">
                                            {brands.map((brand) => (
                                                <option value={brand.id}>{brand.name}</option>
                                            ))}
                                        </Form.Control>
                                    </Form.Group>
                                    <Form.Group controlId="name">
                                        <Form.Label>Name</Form.Label>
                                        <Form.Control type="text" name="name" required placeholder="Name" />
                                    </Form.Group>
                                    <Form.Group controlId="description">
                                        <Form.Label>Description</Form.Label>
                                        <Form.Control type="text" name="description" placeholder="Description" />
                                    </Form.Group>
                                    <Form.Group controlId="quantity">
                                        <Form.Label>Quantity</Form.Label>
                                        <Form.Control type="text" name="quantity" placeholder="Quantity" />
                                    </Form.Group>
                                    <Form.Group controlId="attributeValueId1">
                                        <Form.Label>Attribute Value 1</Form.Label>
                                        <Form.Control as="select" required name="attributeValueId1">
                                            {attributeValues.map((attributeValue1) => (
                                                <option value={attributeValue1.id}>{attributeValue1.name}</option>
                                            ))}
                                        </Form.Control>
                                    </Form.Group>
                                    <Form.Group controlId="attributeValueId2">
                                        <Form.Label>Attribute Value 2</Form.Label>
                                        <Form.Control as="select" required name="attributeValueId2">
                                            {attributeValues.map((attributeValue2) => (
                                                <option value={attributeValue2.id}>{attributeValue2.name}</option>
                                            ))}
                                        </Form.Control>
                                    </Form.Group>
                                    <Form.Group controlId="attributeValueId3">
                                        <Form.Label>Attribute Value 3</Form.Label>
                                        <Form.Control as="select" required name="attributeValueId3">
                                            {attributeValues.map((attributeValue3) => (
                                                <option value={attributeValue3.id}>{attributeValue3.name}</option>
                                            ))}
                                        </Form.Control>
                                    </Form.Group>
                                    <Form.Group controlId="attributeValueId4">
                                        <Form.Label>Attribute Value 4</Form.Label>
                                        <Form.Control as="select" required name="attributeValueId4">
                                            {attributeValues.map((attributeValue4) => (
                                                <option value={attributeValue4.id}>{attributeValue4.name}</option>
                                            ))}
                                        </Form.Control>
                                    </Form.Group>
                                    <Form.Group controlId="image1">
                                        <Form.Label>Image 1</Form.Label>
                                        <Form.Control type="text" name="image1" placeholder="Image 1" />
                                    </Form.Group>
                                    <Form.Group controlId="image2">
                                        <Form.Label>Image 2</Form.Label>
                                        <Form.Control type="text" name="image2" placeholder="Image 2" />
                                    </Form.Group>
                                    <Form.Group controlId="image3">
                                        <Form.Label>Image 3</Form.Label>
                                        <Form.Control type="text" name="image3" placeholder="Image 3" />
                                    </Form.Group>
                                    <Form.Group controlId="image4">
                                        <Form.Label>Image 4</Form.Label>
                                        <Form.Control type="text" name="image4" placeholder="Image 4" />
                                    </Form.Group>
                                    <Form.Group controlId="price">
                                        <Form.Label>Price</Form.Label>
                                        <Form.Control type="text" name="price" required placeholder="Price" />
                                    </Form.Group>
                                    <Form.Group controlId="discount">
                                        <Form.Label>Discount</Form.Label>
                                        <Form.Control type="text" name="discount" required placeholder="Discount" />
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Label>Status</Form.Label>
                                        <Form.Control as="select" required name="status">
                                            <option selected>ACTIVE</option>
                                            <option>INACTIVE</option>
                                        </Form.Control>
                                    </Form.Group>
                                    <Form.Group>
                                        <Button variant="primary" type="submit" >Save</Button>
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
export default AddItemModalComponent