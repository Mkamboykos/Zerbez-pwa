import React, { Component } from 'react'
import {Link, Redirect} from 'react-router-dom'
import {Form} from 'react-bootstrap'
import {TextField, createTheme, MuiThemeProvider, FormHelperText } from '@material-ui/core'
import {IoChevronBack} from 'react-icons/io5'
import Axios from 'axios';


class SignUp extends Component {

    constructor(props) {
        super(props);

        // Initial states
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

            isValid: false,
            redirect: false,

            helperTextFirstName: '',
            helperTextLastName: '',
            helperTextUsername: '',
            helperTextPassword: '',
            errorFirstName: false,
            errorLastName: false,
            errorUsername: false,
            errorPassword: false
        });

        this.handleSignUp = this.handleSignUp.bind(this);
        this.onChangeTextfield = this.onChangeTextfield.bind(this);
    }

    /*
    *  - Update the result of every Textfield in the form
    *  - Return false helpertext and error every time form is submitted
    */
    onChangeTextfield(e){
        let field = e.target.name;
        let value = e.target.value;
        this.setState({
            [field]: value,
            helperTextFirstName: '',
            helperTextLastName: '',
            helperTextUsername: '',
            helperTextEmail: '',
            helperTextPassword:'',
            errorFirstName: false,
            errorLastName: false,
            errorUsername: false,
            errorEmail: false,
            errorPassword: false
        });
    }

    /*
    *  - Textfield validators when onClick event is triggered when submitting the Form
    *    using the isValid state
    *  - isValid must return as true to submit the form
    */
    handleSignUp(e){

        if(this.state.isValid === false){
            this.setState({
                isValid: true
            })
        }

        // Validator -> first_name
        if(this.state.first_name === ""){
            this.setState({
                helperTextFirstName: 'Field cannot be empty!',
                errorFirstName: true,
                isValid: false
            });
        }

        // Validators -> last_name
        if(this.state.last_name === ""){
            this.setState({
                helperTextLastName: 'Field cannot be empty!',
                errorLastName: true,
                isValid: false
            });
        }

        // Validators -> usename
        if(this.state.username === ""){
            this.setState({
                helperTextUsername: 'Field cannot be empty!',
                errorUsername: true,
                isValid: false
            });
        }

        // Validators -> email
        if(this.state.email === ""){
            this.setState({
                helperTextEmail: 'Field cannot be empty!',
                errorEmail: true,
                isValid: false
            });
        }

        // Validators -> password
        if(this.state.password === ""){
            this.setState({
                helperTextPassword: 'Field cannot be empty!',
                errorPassword: true,
                isValid: false
            });
        }
    }

    /*
    *  HTTP POST Request sent to the databse, and redirect is enabled
    */
    postToDatabase = e =>{
        e.preventDefault();
        if(this.state.isValid === true){
            Axios.post('http://localhost:3001/SignUp', {
                first_name: this.state.first_name, 
                last_name: this.state.last_name, 
                username: this.state.username, 
                email: this.state.email, 
                password: this.state.password, 
                confirm_password: this.state.confirm_password, 
                restaurant_name: this.state.restaurant_name, 
                restaurant_address: this.state.restaurant_address, 
                restaurant_city: this.state.restaurant_city, 
                restaurant_state: this.state.restaurant_state, 
                restaurant_zip: this.state.restaurant_zip
            }).then((response) => {
                if(response.status === 200){
                    console.log(response);
                }
            });

            this.setState({
                redirect: true
            })
        }
        console.log(this.state);
    }

    // Redirect to Dashboard when redirect is true
    renderRedirect(){
        if(this.state.redirect){
            return <Redirect to='/Dashboard'/>
        }
    }


    render() {

        // color is the main white used accross the app
        const color = "#F4F1F2";

        // color2 is the grey used accross the app
        const color2 = "#91A8C0";

        // overwrite Textfields' text and format with custome code
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

        return (
            <div className="SignUp_Page_Container">
            <div className="SignUp_Page_Title_Container">
                <h1 className="SignUp_Page_Title">Sign Up</h1>
            </div>
            <Form className="signUp_Form_Container" onSubmit={this.postToDatabase}>

                <MuiThemeProvider theme={theme}>
                    <Form.Group>
                        <TextField
                            label="First Name"
                            type="text"
                            name="first_name"
                            fullWidth
                            error={this.state.errorFirstName}
                            helperText={this.state.helperTextFirstName}
                            value={this.state.first_name}
                            onChange={this.onChangeTextfield}
                        />
                    </Form.Group>

                    <Form.Group>
                        <TextField
                            label="Last Name"
                            type="text"
                            name="last_name"
                            fullWidth
                            error={this.state.errorLastName}
                            helperText={this.state.helperTextLastName}
                            value={this.state.last_name}
                            onChange={this.onChangeTextfield}
                        />
                    </Form.Group>

                    <Form.Group>
                        <TextField
                            label="Username"
                            type="text"
                            name="username"
                            fullWidth
                            error={this.state.errorUsername}
                            helperText={this.state.helperTextUsername}
                            value={this.state.username}
                            onChange={this.onChangeTextfield}
                        />
                    </Form.Group>

                    <Form.Group>
                        <TextField
                            label="Email"
                            type="email"
                            name="email"
                            fullWidth
                            error={this.state.errorEmail}
                            helperText={this.state.helperTextEmail}
                            value={this.state.email}
                            onChange={this.onChangeTextfield}
                        />
                    </Form.Group>
                    
                    <Form.Group >
                        <TextField
                            label="Password"
                            type="password"
                            name="password"
                            fullWidth
                            error={this.state.errorPassword}
                            helperText={this.state.helperTextPassword}
                            value={this.state.password}
                            onChange={this.onChangeTextfield}
                        />
                    </Form.Group>

                    <Form.Group >
                        <TextField
                            label="Confirm Password"
                            type="password"
                            name="confirm_password"
                            fullWidth
                            error={this.state.errorFirstName}
                            helperText={this.state.helperTextFirstName}
                            value={this.state.confirm_password}
                            onChange={this.onChangeTextfield}
                        />
                    </Form.Group>

                    <Form.Group >
                        <TextField
                            label="Restaurant Name"
                            type="text"
                            name="restaurant_name"
                            fullWidth
                            error={this.state.errorFirstName}
                            helperText={this.state.helperTextFirstName}
                            value={this.state.restaurant_name}
                            onChange={this.onChangeTextfield}
                        />
                    </Form.Group>

                    <Form.Group >
                        <TextField
                            label="Restaurant Address"
                            type="address"
                            name="restaurant_address"
                            fullWidth
                            error={this.state.errorFirstName}
                            helperText={this.state.helperTextFirstName}
                            value={this.state.restaurant_address}
                            onChange={this.onChangeTextfield}
                        />
                    </Form.Group>

                    <Form.Group >
                        <TextField
                            label="City"
                            type="city"
                            name="restaurant_city"
                            fullWidth
                            error={this.state.errorFirstName}
                            helperText={this.state.helperTextFirstName}
                            value={this.state.restaurant_city}
                            onChange={this.onChangeTextfield}
                        />
                    </Form.Group>

                    <Form.Group >
                        <TextField
                            label="State"
                            type="state"
                            name="restaurant_state"
                            fullWidth
                            error={this.state.errorFirstName}
                            helperText={this.state.helperTextFirstName}
                            value={this.state.restaurant_state}
                            onChange={this.onChangeTextfield}
                        />
                    </Form.Group>

                    <Form.Group >
                        <TextField
                            label="ZIP Code"
                            type="numbers"
                            name="restaurant_zip"
                            fullWidth
                            error={this.state.errorFirstName}
                            helperText={this.state.helperTextFirstName}
                            value={this.state.restaurant_zip}
                            onChange={this.onChangeTextfield}
                        />
                    </Form.Group>

                    <Form.Group className="" controlId="formBasicCheckbox">
                        <Form.Check 
                            type="radio"
                            label="I affirm to be the current Manager of this establishment." 
                            required
                        />
                    </Form.Group>
                </MuiThemeProvider>

                <div className="signUp_button_two_Container">
                    <button type="submit" className="signUp_button_two" onClick={this.handleSignUp}>SIGN UP</button>
                </div>
                
                {this.renderRedirect()}
                
            </Form>
            
            <Link to="/" className="link"><IoChevronBack className="Back_button_SignUp"/></Link>
        </div>
        )
    
    }
}

export default SignUp;




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