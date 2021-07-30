import React, { useState} from 'react'
import {Link} from 'react-router-dom'
import {Button, Form} from 'react-bootstrap'
import {TextField, createTheme, MuiThemeProvider } from '@material-ui/core'
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

    // color is the main white used accross the app
    const color = "#F4F1F2";
    // color2 is the grey used accross the app
    const color2 = "#91A8C0";

    const theme = createTheme({
        palette: {
            common: { black: color, white: color },
            primary: { main: color, dark: color, light: color },
            text: { primary: color, secondary: color2 },

        },
        overrides: {
            MuiInput: {
                underline: {
                    "&:before": {
                    borderBottom: `1px solid ${color}`
                    }
                }
            }
        }
    });

    
    const getData = (e) => {
        console.warn(e.target.value)
    }


    return(
        <div className="SignUp_Page_Container">
            <div className="SignUp_Page_Title_Container">
                <h1 className="SignUp_Page_Title">Sign Up</h1>
            </div>
            <Form className="signUp_Form_Container" noValidate validated={validated} onSubmit={handleSubmit} >

                <MuiThemeProvider theme={theme}>
                    <Form.Group controlId="validationCustom01">
                        <TextField
                            required
                            disableUnderline={true}
                            label="First Name"
                            type="text"
                            fullWidth
                            onChange={getData}
                        />
                    </Form.Group>

                    <Form.Group controlId="validationCustom02">
                        <TextField
                            required
                            label="Last Name"
                            type="text"
                            fullWidth
                        />
                    </Form.Group>
                    
                    <Form.Group >
                        <TextField
                            required
                            label="Password"
                            type="password"
                            fullWidth
                            // helperText="Your password must be 8-20 characters long, contain letters and numbers, and
                            // must not contain spaces, special characters, or emoji."
                        />
                    </Form.Group>

                    <Form.Group >
                        <TextField
                            required
                            label="Confirm Password"
                            type="password"
                            fullWidth
                        />
                    </Form.Group>

                    <Form.Group >
                        <TextField
                            required
                            label="Restaurant Name"
                            type="text"
                            fullWidth
                        />
                    </Form.Group>

                    <Form.Group >
                        <TextField
                            required
                            label="Restaurant Address"
                            type="address"
                            fullWidth
                        />
                    </Form.Group>

                    <Form.Group >
                        <TextField
                            required
                            label="City"
                            type="city"
                            fullWidth

                        />
                    </Form.Group>

                    <Form.Group >
                        <TextField
                            required
                            label="State"
                            type="state"
                            fullWidth
                        />
                    </Form.Group>

                    <Form.Group >
                        <TextField
                            required
                            label="ZIP Code"
                            type="numbers"
                            fullWidth
                        />
                    </Form.Group>

                    <Form.Group className="" controlId="formBasicCheckbox">
                        <Form.Check 
                            type="radio"
                            label="I affirm to be currently working as a host/hostess at this location." 
                            required
                        />
                    </Form.Group>
                </MuiThemeProvider>

                <div className="signUp_button_two_Container">
                    <Link to="/DashBoard" className="link"><button className="signUp_button_two">SIGN UP</button></Link>
                </div>

            </Form>

            <Link to="/" className="link"><IoChevronBack className="Back_button_SignUp"/></Link>
        </div>
    )
}


export default SignUp;