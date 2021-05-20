import React, { Component } from 'react';

class BuyerRegistration extends Component {

    render() {
        return (
            <form>
                <label>First Name: </label> <input type="text" />
                <label>Last Name:</label><input type="text" />
                <label>Full Name:</label><input type="text" />
                <label>Address Line 1:</label><input type="text" />
                <label>Address Line 2:</label><input type="text" />
                <label>Address Line 3:</label><input type="text" />
                <label>NIC :</label><input type="text" />
                <label>Date of Birth :</label><input type="text" />
                <label>Email Address:</label><input type="text" />
                <label>Mobile Number:</label><input type="text" />
                <label>Landline Number:</label><input type="text" />
                <label>Mobile:</label><input type="text" />
                <label>Card Number:</label><input type="text" />
                <label>CSV Number:</label><input type="text" />
                <label>Expire Date:</label><input type="text" />
                <br /><br />
            </form>
        )
    }
}

export default BuyerRegistration;