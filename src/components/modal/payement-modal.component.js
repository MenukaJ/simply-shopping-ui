import React, {Component} from 'react';
import {Modal, Button, Row, Col, Form, FormGroup, Alert} from 'react-bootstrap';
import PaymentService from '../../services/payment.service';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import "bootstrap/dist/css/bootstrap.min.css";


export class PayementModalComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {snackbaropen: false, snackbarmsg: ''};
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    snackbarClose = (event) => {
        this.setState({snackbaropen: false});
    };

    handleSubmit(event) {

        event.preventDefault();
        //alert(event.target.name.value);
        PaymentService.makePayment(event.target.cardNumber.value, event.target.cvCode.value, event.target.expityYear.value, event.target.expityMonth.value, event.target.payment.value).then(
            response => {
                if (response.message !== undefined) {
                    this.setState({snackbaropen: true, snackbarmsg: response.message+ " reference NO: "+ response.refrenceNo})
                }
            },
            error => {
                console.log(error.response.data);
                if (error.response.data.cardNumber !== undefined) {
                    this.setState({snackbaropen: true, snackbarmsg: error.response.data.cardNumber})
                } else if (error.response.data.cvCode !== undefined) {
                    this.setState({snackbaropen: true, snackbarmsg: error.response.data.cvCode})
                } else if (error.response.data.year !== undefined) {
                    this.setState({snackbaropen: true, snackbarmsg: error.response.data.year})
                }else if (error.response.data.month !== undefined) {
                    this.setState({snackbaropen: true, snackbarmsg: error.response.data.month})
                }else if (error.response.data.payment !== undefined) {
                    this.setState({snackbaropen: true, snackbarmsg: error.response.data.payment})
                }
                //this.setState({snackbaropen: true, snackbarmsg: "failed"})

            }
        );
    }

    render() {

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
                            Payment Details
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>

                        <Row>
                            <Col sm={6}>
                                <Form onSubmit={this.handleSubmit}>
                                    <Form.Group controlId="name">
                                        <Form.Label>Card Number</Form.Label>
                                        <Form.Control type="number" name="cardNumber" required placeholder="xxxx xxxx xxxx xxxx" />
                                    </Form.Group>
                                    <div className="row">
                                        <div className="col-xs-7 col-md-7">
                                            <div className="form-group">
                                                <Form.Group controlId="expityYear">
                                                    <Form.Label>Expity Year</Form.Label>
                                                    <Form.Control type="number" name="expityYear" required placeholder="YY" />
                                                </Form.Group>
                                                <div className="col-xs-6 col-lg-6 pl-ziro">
                                                    <Form.Group controlId="cvCode">
                                                        <Form.Label>CV</Form.Label>
                                                        <Form.Control type="number" name="cvCode" required placeholder="123" />
                                                    </Form.Group>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-xs-5 col-md-5 pull-right">
                                            <Form.Group controlId="expityMonth">
                                                <Form.Label>Expity Month</Form.Label>
                                                <Form.Control type="number" name="expityMonth" required placeholder="MM" />
                                            </Form.Group>
                                        </div>
                                    </div>
                                    <Form.Group controlId="payment">
                                        <Form.Label>Total Payment</Form.Label>
                                        <Form.Control type="number" name="payment" disabled required placeholder="2500.00" value="2500.00" />
                                    </Form.Group>
                                    <Form.Group>
                                        <Button variant="success" type="submit" style={{width:"350px"}}>
                                            Pay
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

export default PayementModalComponent