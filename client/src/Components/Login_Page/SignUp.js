import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import {Form} from 'react-bootstrap'
import {TextField, createTheme, MuiThemeProvider } from '@material-ui/core'
import {IoChevronBack} from 'react-icons/io5'
import Axios from 'axios';


export default class SignUp extends Component {

    constructor(props) {
        super(props);

        this.state = ({
            first_name: "", 
            last_name: "", 
            username: "", 
            email: "", 
            password: "", 
            confirm_password: "", 
            restaurant_name: "", 
            restaurant_address: "", 
            restaurant_city: "", 
            restaurant_state: "", 
            restaurant_zip: "",
            errors: {}
        });
    }

    onChange = (e) => {
        this.setState({[e.target.name] : e.target.value});
    }

    formValidation = () => {
        const {first_name, last_name, username,email, password, confirm_password, restaurant_name, restaurant_address, restaurant_city, restaurant_state, restaurant_zip} = this.state;
        let isValid = true;
        const errors = {};
        if (username.trim().length < 6){
            errors.usernameLengthShort = "Username must be greater than 6 characters";
            isValid = false;
        }

        // if (!username.includes("$")){
        //     errors.username$ = "Username must have a $";
        //     isValid = false;
        // }
        this.setState({errors});
        return isValid;
    }

    onSubmit = (e) => {
        e.preventDefault();
        const isValid = this.formValidation();
        if (isValid === true){
            this.signUpSubmit();
        }
    }

    //function called when button SIGN UP button is clicked
    // signUpSubmit(e){
    //     //const {first_name, last_name, username, email, password, confirm_password, restaurant_name, restaurant_address, restaurant_city, restaurant_state, restaurant_zip} = this.state;
    //     Axios.post('http://localhost:3001/SignUp', {
    //         first_name: this.state.first_name, 
    //         last_name: this.state.last_name, 
    //         username: this.state.username, 
    //         email: this.state.email, 
    //         password: this.state.password, 
    //         confirm_password: this.state.confirm_password, 
    //         restaurant_name: this.state.restaurant_name, 
    //         restaurant_address: this.state.restaurant_address, 
    //         restaurant_city: this.state.restaurant_city, 
    //         restaurant_state: this.state.restaurant_state, 
    //         restaurant_zip: this.state.restaurant_zip
    //     }).then((response) => {
    //         console.log(response);
    //     });
    // };

    render() {
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

        const {first_name, last_name, username,email, password, confirm_password, restaurant_name, restaurant_address, restaurant_city, restaurant_state, restaurant_zip, errors} = this.state;
        
        return (
            <div className="SignUp_Page_Container">
            <div className="SignUp_Page_Title_Container">
                <h1 className="SignUp_Page_Title">Sign Up</h1>
            </div>
            <Form className="signUp_Form_Container" >

                <MuiThemeProvider theme={theme}>
                    <Form.Group>
                    <TextField
                            required
                            label="First Name"
                            type="text"
                            name="first_name"
                            fullWidth
                            value={first_name}
                            onChange={this.onChange}
                        />
                    </Form.Group>

                    <Form.Group>
                        <TextField
                            required
                            label="Last Name"
                            type="text"
                            name="last_name"
                            fullWidth
                            value={last_name}
                            onChange={this.onChange}
                        />
                    </Form.Group>

                    <Form.Group>
                        <TextField
                            required
                            disableUnderline={true}
                            label="Username"
                            type="text"
                            name="username"
                            fullWidth
                            value={username}
                            onChange={this.onChange}
                        />
                    </Form.Group>

                    <Form.Group>
                        <TextField
                            required
                            disableUnderline={true}
                            label="Email"
                            type="email"
                            name="email"
                            fullWidth
                            value={email}
                            onChange={this.onChange}
                        />
                    </Form.Group>
                    
                    <Form.Group >
                        <TextField
                            required
                            label="Password"
                            type="password"
                            fullWidth
                            name="password"
                            value={password}
                            onChange={this.onChange}
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
                            name="confirm_password"
                            value={confirm_password}
                            onChange={this.onChange}
                        />
                    </Form.Group>

                    <Form.Group >
                        <TextField
                            required
                            label="Restaurant Name"
                            type="text"
                            fullWidth
                            name="restaurant_name"
                            value={restaurant_name}
                            onChange={this.onChange}
                        />
                    </Form.Group>

                    <Form.Group >
                        <TextField
                            required
                            label="Restaurant Address"
                            type="address"
                            fullWidth
                            name="restaurant_address"
                            value={restaurant_address}
                            onChange={this.onChange}
                        />
                    </Form.Group>

                    <Form.Group >
                        <TextField
                            required
                            label="City"
                            type="city"
                            fullWidth
                            name="restaurant_city"
                            value={restaurant_city}
                            onChange={this.onChange}
                        />
                    </Form.Group>

                    <Form.Group >
                        <TextField
                            required
                            label="State"
                            type="state"
                            fullWidth
                            name="restaurant_state"
                            value={restaurant_state}
                            onChange={this.onChange}
                        />
                    </Form.Group>

                    <Form.Group >
                        <TextField
                            required
                            label="ZIP Code"
                            type="numbers"
                            fullWidth
                            name="restaurant_zip"
                            value={restaurant_zip}
                            onChange={this.onChange}
                        />
                    </Form.Group>

                    <Form.Group className="" controlId="formBasicCheckbox">
                        <Form.Check 
                            type="radio"
                            label="I affirm to be the current Manager at this establishment." 
                            required
                        />
                    </Form.Group>
                </MuiThemeProvider>

                <div className="signUp_button_two_Container">
                    <button type="submit" className="signUp_button_two">SIGN UP</button>
                </div>

                {Object.keys(errors).map((key)=>{
                    return <div  key={key}>{errors[key]}</div>
                })}

            </Form>

            <Link to="/" className="link"><IoChevronBack className="Back_button_SignUp"/></Link>
        </div>
        )
    }
}






// import React, { useState} from 'react'
// import {Link} from 'react-router-dom'
// import {Button, Form} from 'react-bootstrap'
// import {TextField, createTheme, MuiThemeProvider } from '@material-ui/core'
// import {IoChevronBack} from 'react-icons/io5'
// import Axios from 'axios';

// /*   SignUp.js is rendered in App.js    */

// function SignUp() {
       
//     const [first_nameReg, setFirst_nameReg] = useState("");
//     const [last_nameReg, setLast_nameReg] = useState("");
//     const [usernameReg, setUsernameReg] = useState("");
//     const [emailReg, setEmailReg] = useState("");
//     const [passwordReg, setPasswordReg] = useState("");
//     const [confirm_passwordReg, setConfirm_passwordReg] = useState("");
//     const [restaurant_nameReg, setRestaurant_nameReg] = useState("");
//     const [restaurant_addressReg, setRestaurant_addressReg] = useState("");
//     const [restaurant_cityReg, setRestaurant_cityReg] = useState("");
//     const [restaurant_stateReg, setRestaurant_stateReg] = useState("");
//     const [restaurant_zipReg, setRestaurant_zipReg] = useState(0);


    // //function called when button SIGN UP button is clicked
    // const signUpSubmit = () =>{
    //     Axios.post('http://localhost:3001/SignUp', {
    //         first_name: first_nameReg, 
    //         last_name: last_nameReg, 
    //         username: usernameReg, 
    //         email: emailReg, 
    //         password: passwordReg, 
    //         confirm_password: confirm_passwordReg, 
    //         restaurant_name: restaurant_nameReg, 
    //         restaurant_address: restaurant_addressReg, 
    //         restaurant_city: restaurant_cityReg, 
    //         restaurant_state: restaurant_stateReg, 
    //         restaurant_zip: restaurant_zipReg
    // }).then((response) => {
    //     console.log(response);
    // });
    // };
    


    // // color is the main white used accross the app
    // const color = "#F4F1F2";
    // // color2 is the grey used accross the app
    // const color2 = "#91A8C0";

    // const theme = createTheme({
    //     palette: {
    //         common: { black: color, white: color },
    //         primary: { main: color, dark: color, light: color },
    //         text: { primary: color, secondary: color2 },

    //     },
    //     overrides: {
    //         MuiInput: {
    //             underline: {
    //                 "&:before": {
    //                 borderBottom: `1px solid ${color}`
    //                 }
    //             }
    //         }
    //     }
    // });




//     return(
        // <div className="SignUp_Page_Container">
        //     <div className="SignUp_Page_Title_Container">
        //         <h1 className="SignUp_Page_Title">Sign Up</h1>
        //     </div>
        //     <Form className="signUp_Form_Container" >

        //         <MuiThemeProvider theme={theme}>
        //             <Form.Group>
        //             <TextField
        //                     required
        //                     label="First Name"
        //                     type="text"
        //                     fullWidth
        //                     onChange={(e) => {
        //                         setFirst_nameReg(e.target.value);
        //                     }}
        //                 />
        //             </Form.Group>

        //             <Form.Group>
        //                 <TextField
        //                     required
        //                     label="Last Name"
        //                     type="text"
        //                     fullWidth
        //                     onChange={(e) => {
        //                         setLast_nameReg(e.target.value);
        //                     }}
        //                 />
        //             </Form.Group>

        //             <Form.Group>
        //                 <TextField
        //                     required
        //                     disableUnderline={true}
        //                     label="Username"
        //                     type="text"
        //                     fullWidth
        //                     onChange={(e) => {
        //                         setUsernameReg(e.target.value);
        //                     }}
        //                 />
        //             </Form.Group>

        //             <Form.Group>
        //                 <TextField
        //                     required
        //                     disableUnderline={true}
        //                     label="Email"
        //                     type="text"
        //                     fullWidth
        //                     onChange={(e) => {
        //                         setEmailReg(e.target.value);
        //                     }}
        //                 />
        //             </Form.Group>
                    
        //             <Form.Group >
        //                 <TextField
        //                     required
        //                     label="Password"
        //                     type="password"
        //                     fullWidth
        //                     onChange={(e) => {
        //                         setPasswordReg(e.target.value);
        //                     }}
        //                     // helperText="Your password must be 8-20 characters long, contain letters and numbers, and
        //                     // must not contain spaces, special characters, or emoji."
        //                 />
        //             </Form.Group>

        //             <Form.Group >
        //                 <TextField
        //                     required
        //                     label="Confirm Password"
        //                     type="password"
        //                     fullWidth
        //                     onChange={(e) => {
        //                         setConfirm_passwordReg(e.target.value);
        //                     }}
        //                 />
        //             </Form.Group>

        //             <Form.Group >
        //                 <TextField
        //                     required
        //                     label="Restaurant Name"
        //                     type="text"
        //                     fullWidth
        //                     onChange={(e) => {
        //                         setRestaurant_nameReg(e.target.value);
        //                     }}
        //                 />
        //             </Form.Group>

        //             <Form.Group >
        //                 <TextField
        //                     required
        //                     label="Restaurant Address"
        //                     type="address"
        //                     fullWidth
        //                     onChange={(e) => {
        //                         setRestaurant_addressReg(e.target.value);
        //                     }}
        //                 />
        //             </Form.Group>

        //             <Form.Group >
        //                 <TextField
        //                     required
        //                     label="City"
        //                     type="city"
        //                     fullWidth
        //                     onChange={(e) => {
        //                         setRestaurant_cityReg(e.target.value);
        //                     }}
        //                 />
        //             </Form.Group>

        //             <Form.Group >
        //                 <TextField
        //                     required
        //                     label="State"
        //                     type="state"
        //                     fullWidth
        //                     onChange={(e) => {
        //                         setRestaurant_stateReg(e.target.value);
        //                     }}
        //                 />
        //             </Form.Group>

        //             <Form.Group >
        //                 <TextField
        //                     required
        //                     label="ZIP Code"
        //                     type="numbers"
        //                     fullWidth
        //                     onChange={(e) => {
        //                         setRestaurant_zipReg(e.target.value);
        //                     }}
        //                 />
        //             </Form.Group>

        //             <Form.Group className="" controlId="formBasicCheckbox">
        //                 <Form.Check 
        //                     type="radio"
        //                     label="I affirm to be the current Manager at this establishment." 
        //                     required
        //                 />
        //             </Form.Group>
        //         </MuiThemeProvider>

        //         <div className="signUp_button_two_Container">
        //             <Link to="/DashBoard" className="link"><button type="submit" onClick={signUpSubmit} onSubmit className="signUp_button_two">SIGN UP</button></Link>
        //         </div>

        //     </Form>

        //     <Link to="/" className="link"><IoChevronBack className="Back_button_SignUp"/></Link>
        // </div>
//     )
// }


// export default SignUp;