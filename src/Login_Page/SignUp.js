import React from 'react'
import {Link} from 'react-router-dom'
import {Form} from 'react-bootstrap'
import {IoChevronBack} from 'react-icons/io5'

/*   SignUp.js is rendered in App.js    */

function SignUp() {

    return(
        <div className="SignUp_Page_Container">
            <Link to="/" className="link"><IoChevronBack className="Back_button_SignUp"/></Link>
            <h1 className="SignUp_Page_Title">Sign Up</h1>
            
            <Form>
                <Form.Group className="" controlId="formBasicEmail">
                    <Form.Control 
                        type="email" 
                        placeholder="First Name" 
                    />
                </Form.Group>

                <Form.Group className="" controlId="formBasicEmail">
                    <Form.Control 
                        type="email" 
                        placeholder="Last Name" 
                    />
                </Form.Group>

                <Form.Group className="" controlId="formBasicEmail">
                    <Form.Control 
                        type="email" 
                        placeholder="Password" 
                    />
                </Form.Group>

                <Form.Group className="" controlId="formBasicPassword">
                    <Form.Control 
                        type="password" 
                        placeholder="Confirm Password" 
                    />
                </Form.Group>

                <Form.Group className="" controlId="formBasicPassword">
                    <Form.Control 
                        type="password" 
                        placeholder="Restaurant Name" 
                    />
                </Form.Group>

                <Form.Group className="" controlId="formBasicPassword">
                    <Form.Control 
                        type="password" 
                        placeholder="Restaurant Address" 
                    />
                </Form.Group>

                <Form.Group className="" controlId="formBasicPassword">
                    <Form.Control 
                        type="password" 
                        placeholder="City" 
                    />
                </Form.Group>

                <Form.Group className="" controlId="formBasicPassword">
                    <Form.Control 
                        type="password" 
                        placeholder="State" 
                    />
                </Form.Group>

                <Form.Group className="" controlId="formBasicPassword">
                    <Form.Control 
                        type="password" 
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