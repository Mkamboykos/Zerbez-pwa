import React, { useState, Col, makeStyles } from 'react'
import {Link} from 'react-router-dom'
import {Form} from 'react-bootstrap'
import {TextField} from '@material-ui/core'

import {IoChevronBack} from 'react-icons/io5'

/*   SignUp.js is rendered in App.js    */

function SignUp() {

    const [validated, setValidated] = useState(false);

    const handleSubmit = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }

        setValidated(true);
    };


    return(
        <div className="SignUp_Page_Container">
            <Link to="/" className="link"><IoChevronBack className="Back_button_SignUp"/></Link>
            <h1 className="SignUp_Page_Title">Sign Up</h1>
            
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Form.Group controlId="validationCustom01" as={Col} md="4">
                    <TextField
                        required
                        className="signUp_TextField"
                        variant ="filled"
                        label="First Name"
                        type="text"
                    />
                </Form.Group>

                <Form.Group controlId="validationCustom02" as={Col} md="4">
                    <Form.Control required type="text" placeholder="Last Name" />
                </Form.Group>

                <Form.Group className="" htmlFor="inputPassword5" controlId="formBasicEmail">
                    <Form.Control 
                        type="password" 
                        id="inputPassword5"
                        aria-describedby="passwordHelpBlock"
                        placeholder="Password" 
                    />
                    <Form.Text id="passwordHelpBlock" muted>
                        Your password must be 8-20 characters long, contain letters and numbers, and
                        must not contain spaces, special characters, or emoji.
                    </Form.Text>
                </Form.Group>

                <Form.Group className="" controlId="formBasicPassword">
                    <Form.Control 
                        type="confirmPassword" 
                        placeholder="Confirm Password" 
                    />
                </Form.Group>

                <Form.Group className="" controlId="formBasicPassword">
                    <Form.Control 
                        type="restaurantName" 
                        placeholder="Restaurant Name" 
                    />
                </Form.Group>

                <Form.Group className="" controlId="formBasicPassword">
                    <Form.Control 
                        type="restaurantAddress" 
                        placeholder="Restaurant Address" 
                    />
                </Form.Group>

                <Form.Group className="" controlId="formBasicPassword">
                    <Form.Control 
                        type="city" 
                        placeholder="City" 
                    />
                </Form.Group>

                <Form.Group className="" controlId="formBasicPassword">
                    <Form.Control 
                        type="state" 
                        placeholder="State" 
                    />
                </Form.Group>

                <Form.Group className="" controlId="formBasicPassword">
                    <Form.Control 
                        type="zipCode" 
                        placeholder="ZIP Code" 
                    />
                </Form.Group>

                <Form.Group className="" controlId="formBasicCheckbox">
                    <Form.Check 
                        type="radio"
                        label="I affirm to be currently working as a host/hostess at this location." 
                    />
                </Form.Group>
            </Form>

            <button className="signUp_button_two"><Link to="/DashBoard" className="link">SIGN UP</Link></button>
        </div>
    )
}


export default SignUp;