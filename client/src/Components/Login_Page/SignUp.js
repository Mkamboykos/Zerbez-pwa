import React, {Component} from 'react'
import {Link, Navigate} from 'react-router-dom'
import {Form} from 'react-bootstrap'
import {TextField, createTheme, MuiThemeProvider,InputAdornment, IconButton, FormHelperText, MenuItem, FormControl, InputLabel, withStyles, Select, FormControlLabel, Checkbox} from '@material-ui/core'
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import {IoChevronBack} from 'react-icons/io5'
import Axios from 'axios';
import termsOfUse from '../../Documents/terms-of-use-template.pdf';

// styles are used to set the color white in the check boxes
const styles = {
    root: {
        // when checkbox is inactive
        color: "#f4f1f27a",
        '&$checked': {
            // when checkbox is active
            color: "#FFFFFF",
            '&:hover': {
                background: "none",           
            },
        },
        '&:hover': {
            background: "none",           
        },
    },
    checked: {},
    
    // color of icon for state select drop down menu
    icon: {
        fill: "#FFFFFF",
    },

    // color for visibility
    toggleIcon: {
        color: "#FFFFFF",
    },
     // color of menu item for state select drop down menu
    selected: {
        backgroundColor: "#FFFFFF",
        color: "#3D3D3D",
        horizontal: "left",
        "&:focus": {
			backgroundColor: "#3D3D3D",
            color: "#FFFFFF",
		}, 
        "&:hover": {
			backgroundColor: "#3D3D3D",
            color: "#FFFFFF",
		},
    },
};


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
            retypePassword: "", 
            restaurant_name: "", 
            restaurant_address: "", 
            restaurant_city: "", 
            restaurant_state: "", 
            restaurant_zip: "",

            //password requirements
            helperTextPasswordLength: "Must be between 8 and 20 characters long ",
            helperTextPasswordUppercase: "Must contain at least one uppercase character",
            helperTextPasswordLowercase: "Must contain at least one lowercase character",
            helperTextPasswordNumber: "Must contain at least one number",
            helperTextPasswordSpecial: "Must contain special character(s) (e.g. !@$&$)",

            existUsername:'',
            existEmail: '',
            isValid: false,
            redirect: false,
            isChecked1: false,
            isChecked2: false,
            showPassword: false,
            showRetypePassword: false,
        });

        this.handleSignUp = this.handleSignUp.bind(this);
        this.handleKeyPressSignUp = this.handleKeyPressSignUp.bind(this);
        this.onChangeTextfield = this.onChangeTextfield.bind(this);
        this.onChangeCheckBox = this.onChangeCheckBox.bind(this);
        this.handleMouseDownPassword = this.handleMouseDownPassword.bind(this);
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
            helperTextPasswordLength: 'Must be between 8 and 20 characters long',
            helperTextPasswordUppercase: 'Must contain at least one uppercase character',
            helperTextPasswordLowercase: 'Must contain at least one lowercase character',
            helperTextPasswordNumber: 'Must contain at least one number',
            helperTextPasswordSpecial: 'Must contain special character(s) (e.g. !@$&$)',
            helperTextRetypePassword: '',
            helperTextRestaurantName: '',
            helperTextRestaurantAddress: '',
            helperTextRestaurantCity: '',
            helperTextRestaurantState: '',
            helperTextRestaurantZip: '',
            existUsername:'',
            existEmail: '',
            errorFirstName: false,
            errorLastName: false,
            errorUsername: false,
            errorEmail: false,
            errorPassword: false,
            errorRetypePassword: false,
            errorRestaurantName: false,
            errorRestaurantAddress: false,
            errorRestaurantCity: false,
            errorRestaurantState: false,
            errorRestaurantZip: false,
        });
    }

    onChangeCheckBox(e){
        this.setState({
            [e.target.name]: e.target.checked
        })
    }

    handleClickShowPassword = () => {
        this.setState({ 
            showPassword: !this.state.showPassword 
        });
    };

    handleClickShowRetypePassword = () => {
        this.setState({ 
            showRetypePassword: !this.state.showRetypePassword 
        });
    };

    handleMouseDownPassword(e){
        e.preventDefault();
    };

    /*
    *  - Textfield validators when onClick event is triggered when submitting the Form
    *    using the isValid state
    *  - isValid must return as true to submit the form
    */
    handleSignUp(){

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
        }else if(!(this.state.first_name).match(/^[A-Za-z]+$/)){
            this.setState({
                helperTextFirstName: 'Field can only have letters!',
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
        }else if(!(this.state.last_name).match(/^[A-Za-z]+$/)){
            this.setState({
                helperTextLastName: 'Field can only have letters!',
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
        }else if(!(this.state.username).match(/^[a-zA-Z0-9]+$/)){
            this.setState({
                helperTextUsername: 'Field can only have letters and numbers!',
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
        }else if(!(this.state.email).match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)){   // eslint-disable-line
            this.setState({
                helperTextEmail: 'This is not a valid email!',
                errorEmail: true,
                isValid: false
            });
        }
        
        // Validators -> password
        if(this.state.password === ""){
            this.setState({
                helperTextPasswordLength: 'Field cannot be empty!',
                helperTextPasswordUppercase: '',
                helperTextPasswordLowercase: '',
                helperTextPasswordNumber: '',
                helperTextPasswordSpecial: '',
                errorPassword: true,
                isValid: false
            });
        }else if(this.state.password.length < 8){
            this.setState({
                helperTextPasswordLength: 'Password is too short!',
                helperTextPasswordUppercase: '',
                helperTextPasswordLowercase: '',
                helperTextPasswordNumber: '',
                helperTextPasswordSpecial: '',
                errorPassword: true,
                isValid: false
            });
        }else if(this.state.password.length > 20){
            this.setState({
                helperTextPasswordLength: 'Password is too long!',
                helperTextPasswordUppercase: '',
                helperTextPasswordLowercase: '',
                helperTextPasswordNumber: '',
                helperTextPasswordSpecial: '',
                errorPassword: true,
                isValid: false
            });
        }else if((this.state.password).match(/[\s]/)){
            this.setState({
                helperTextPasswordLength: '',
                helperTextPasswordUppercase: '',
                helperTextPasswordLowercase: '',
                helperTextPasswordNumber: '',
                helperTextPasswordSpecial: 'Password cannot contain whitespaces!',
                errorPassword: true,
                isValid: false
            });
        }else if(!(this.state.password).match(/[A-Z]/)){
            this.setState({
                helperTextPasswordLength: '',
                helperTextPasswordUppercase: 'Must contain at least one uppercase character!',
                helperTextPasswordLowercase: '',
                helperTextPasswordNumber: '',
                helperTextPasswordSpecial: '',
                errorPassword: true,
                isValid: false
            });
        }else if(!(this.state.password).match(/[a-z]/)){
            this.setState({
                helperTextPasswordLength: '',
                helperTextPasswordUppercase: '',
                helperTextPasswordLowercase: 'Must contain at least one lowercase character!',
                helperTextPasswordNumber: '',
                helperTextPasswordSpecial: '',
                errorPassword: true,
                isValid: false
            });
        }else if(!(this.state.password).match(/[0-9]/)){
            this.setState({
                helperTextPasswordLength: '',
                helperTextPasswordUppercase: '',
                helperTextPasswordLowercase: '',
                helperTextPasswordNumber: 'Must contain at least one number!',
                helperTextPasswordSpecial: '',
                errorPassword: true,
                isValid: false
            });
        }else if(!(this.state.password).match(/[^\w\s]/)){
            this.setState({
                helperTextPasswordLength: '',
                helperTextPasswordUppercase: '',
                helperTextPasswordLowercase: '',
                helperTextPasswordNumber: '',
                helperTextPasswordSpecial: 'Must contain special character(s) (e.g. !@$&$)',
                errorPassword: true,
                isValid: false
            });
        }else {
            this.setState({
                helperTextPasswordLength: '',
                helperTextPasswordUppercase: '',
                helperTextPasswordLowercase: '',
                helperTextPasswordNumber: '',
                helperTextPasswordSpecial: '',
                isValid: true
            });
        }

        // Validators -> confirm_password
        if(this.state.retypePassword === ""){
            this.setState({
                helperTextRetypePassword: 'Field cannot be empty!',
                errorRetypePassword: true,
                isValid: false
            });
        }else if(this.state.retypePassword !== this.state.password){
            this.setState({
                helperTextRetypePassword: 'Passwords do not match!',
                errorRetypePassword: true,
                isValid: false
            });
        }else if(this.state.retypePassword === this.state.password){
            this.setState({
                helperTextRetypePassword: 'Passwords match!',
                isValid: true
            });
        }

        // Validators -> restaurant_name
        if(this.state.restaurant_name === ""){
            this.setState({
                helperTextRestaurantName: 'Field cannot be empty!',
                errorRestaurantName: true,
                isValid: false
            });
        }

        // Validators -> restaurant_address
        if(this.state.restaurant_address === ""){
            this.setState({
                helperTextRestaurantAddress: 'Field cannot be empty!',
                errorRestaurantAddress: true,
                isValid: false
            });
        }

        // Validators -> restaurant_city
        if(this.state.restaurant_city === ""){
            this.setState({
                helperTextRestaurantCity: 'Field cannot be empty!',
                errorRestaurantCity: true,
                isValid: false
            });
        }else if((this.state.restaurant_city).match(/[0-9]/)){
            this.setState({
                helperTextRestaurantCity: 'Field cannot have numbers!',
                errorRestaurantCity: true,
                isValid: false
            });
        }

        // Validators -> restaurant_state
        if(this.state.restaurant_state === ""){
            this.setState({
                helperTextRestaurantState: 'Field cannot be empty!',
                errorRestaurantState: true,
                isValid: false
            });
        }

        // Validators -> restaurant_zip
        if(this.state.restaurant_zip === ""){
            this.setState({
                helperTextRestaurantZip: 'Field cannot be empty!',
                errorRestaurantZip: true,
                isValid: false
            });
        }else if(!(this.state.restaurant_zip).match(/^[0-9]+$/)){
            this.setState({
                helperTextRestaurantZip: 'ZIP Code can only have numbers!',
                errorRestaurantZip: true,
                isValid: false
            });
        }

        // Validators -> checked1
        if(this.state.isChecked1 === false){
            this.setState({
                isValid: false
            });
        }

        // Validators -> checked2
        if(this.state.isChecked2 === false){
            this.setState({
                isValid: false
            });
        }
    }


    handleKeyPressSignUp(e){
        if (e.key === "Enter"){
            this.handleSignUp()
        }
    }

    
    // HTTP POST Request sent to the databse, and redirect is enabled
    checkExistingUsernameAndSubmit = async e =>{
        e.preventDefault();
        
        if((this.state.isValid && this.state.isChecked1 && this.state.isChecked2) === true){
            // if username and email are unique then post the account to the database
            await Axios.post('http://localhost:3001/SignUp/Manager', {
                first_name: this.state.first_name, 
                last_name: this.state.last_name, 
                username: this.state.username, 
                email: this.state.email, 
                password: this.state.password, 
                restaurant_name: this.state.restaurant_name, 
                restaurant_address: this.state.restaurant_address, 
                restaurant_city: this.state.restaurant_city, 
                restaurant_state: this.state.restaurant_state, 
                restaurant_zip: this.state.restaurant_zip
            }).then(res => {

                if(res.data.validationErrors){
                    // Check if username already exist
                    if (res.data.validationErrors.username){
                        this.setState({
                            helperTextUsername: res.data.validationErrors.username,
                            errorUsername: true,
                            isValid: false,
                        });
                    }

                    // Check if email already being used
                    if(res.data.validationErrors.email){
                        this.setState({
                            helperTextEmail: res.data.validationErrors.email,
                            errorEmail: true,
                            isValid: false,
                        });
                    }
                }else if(res.data === "SUCCESS"){
                    this.setState({
                        redirect: true
                    }) 
                }
            }).catch(error => console.log(error)); 
        }
    }

    // Redirect to Dashboard when redirect is true
    renderRedirect(){
        if(this.state.redirect === true){
            return <Navigate to='/'/>
        }
    }

    render(){

        // color is the main white used accross the app
        const color = "#FFFFFF";

        // color2 is the dark grey used accross the app
        const color2 = "#f4f1f27a";

        // overwrite Textfields' text and format with custome code
        const theme = createTheme({
            palette: {
                common: { black: color, white: color },
                primary: { main: color, dark: color, light: color },
                text: { primary: color, secondary: color2 },
            },
            overrides: {
                MuiInput: {
                    formControl: {
                        weight: 300,
                        fontSize: "17px"
                    },
                    
                    underline: {
                        "&:before": {
                        borderBottom: `2px solid ${color}`
                        }
                    }
                }
            }
        });


        // classes are used for the white color of the checkboxes, this calls to the props being used on this class
        const { classes } = this.props;
        
        
        return (
            <div className="SignUp_Page_Container">
                <div className="SignUp_Page_Title_Container">
                    <h1 className="SignUp_Page_Title">Sign Up</h1>
                </div>
                <Form className="signUp_Form_Container" onKeyPress={this.handleKeyPressSignUp} onSubmit={this.checkExistingUsernameAndSubmit}>

                    <MuiThemeProvider theme={theme}>
                        <FormControl>

                            <TextField
                                id="first_name"
                                label="First Name"
                                type="text"
                                name="first_name"
                                fullWidth
                                error={this.state.errorFirstName}
                                helperText={this.state.helperTextFirstName}
                                value={this.state.first_name}
                                onChange={this.onChangeTextfield}
                            />
                        </FormControl>

                        <FormControl>
                            <TextField
                                id="last_name"
                                label="Last Name"
                                type="text"
                                name="last_name"
                                fullWidth
                                error={this.state.errorLastName}
                                helperText={this.state.helperTextLastName}
                                value={this.state.last_name}
                                onChange={this.onChangeTextfield}
                            />
                        </FormControl>

                        <FormControl>
                            <TextField
                                id="username"
                                label="Username"
                                type="text"
                                name="username"
                                fullWidth
                                error={this.state.errorUsername}
                                helperText={this.state.helperTextUsername}
                                value={this.state.username}
                                onChange={this.onChangeTextfield}
                            />
                        </FormControl>

                        <FormControl>
                            <TextField
                                id="email"
                                label="Email"
                                type="email"
                                name="email"
                                fullWidth
                                error={this.state.errorEmail}
                                helperText={this.state.helperTextEmail}
                                value={this.state.email}
                                onChange={this.onChangeTextfield}
                            />
                        </FormControl>
                        
                        <FormControl>
                            <TextField
                                id="password"
                                label="Password"
                                name="password"
                                fullWidth
                                error={this.state.errorPassword}
                                helperText={
                                    <span className="multiline-block">
                                        <span className="multiline-block">{this.state.helperTextPasswordLength}</span>
                                        <span className="multiline-block">{this.state.helperTextPasswordUppercase}</span>
                                        <span className="multiline-block">{this.state.helperTextPasswordLowercase}</span>
                                        <span className="multiline-block">{this.state.helperTextPasswordNumber}</span>
                                        <span className="multiline-block">{this.state.helperTextPasswordSpecial}</span>
                                    </span>
                                }
                                value={this.state.password}
                                onChange={this.onChangeTextfield}
                                
                                type={this.state.showPassword ? 'text' : 'password'}
                                InputProps={{
                                    endAdornment:(
                                        <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={this.handleClickShowPassword}
                                            onMouseDown={this.handleMouseDownPassword}
                                            classes={{root: classes.toggleIcon}}
                                        >
                                            {this.state.showPassword ? <Visibility /> : <VisibilityOff />}
                                        </IconButton>
                                        </InputAdornment>
                                    )  
                                }}
                            />
                        </FormControl>

                        <FormControl>
                            <TextField
                                id="retype_password"
                                label="Retype Password"
                                name="retypePassword"
                                fullWidth
                                error={this.state.errorRetypePassword}
                                helperText={this.state.helperTextRetypePassword}
                                value={this.state.retypePassword}
                                onChange={this.onChangeTextfield}
                                type={this.state.showRetypePassword ? 'text' : 'password'}
                                InputProps={{
                                    endAdornment:(
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={this.handleClickShowRetypePassword}
                                                onMouseDown={this.handleMouseDownPassword}
                                                classes={{root: classes.toggleIcon}}
                                            >
                                                {this.state.showRetypePassword ? <Visibility/> : <VisibilityOff/>}
                                            </IconButton>
                                        </InputAdornment>
                                    )  
                                }}
                            />
                        </FormControl>

                        <FormControl>
                            <TextField
                                id="restaurant_name"
                                label="Restaurant Name"
                                type="text"
                                name="restaurant_name"
                                fullWidth
                                error={this.state.errorRestaurantName}
                                helperText={this.state.helperTextRestaurantName}
                                value={this.state.restaurant_name}
                                onChange={this.onChangeTextfield}
                            />
                        </FormControl>

                        <FormControl>
                            <TextField
                                id="restaurant_address"
                                label="Restaurant Address"
                                type="address"
                                name="restaurant_address"
                                fullWidth
                                error={this.state.errorRestaurantAddress}
                                helperText={this.state.helperTextRestaurantAddress}
                                value={this.state.restaurant_address}
                                onChange={this.onChangeTextfield}
                            />
                        </FormControl>

                        <FormControl>
                            <TextField
                                id="city"
                                label="City"
                                type="city"
                                name="restaurant_city"
                                fullWidth
                                error={this.state.errorRestaurantCity}
                                helperText={this.state.helperTextRestaurantCity}
                                value={this.state.restaurant_city}
                                onChange={this.onChangeTextfield}
                            />
                        </FormControl>

                        <FormControl error={this.state.errorRestaurantState}>
                            <InputLabel id="dropdown-state-select" className="state-label">State</InputLabel>
                            <Select
                                label="dropdown-state-select"
                                type="state"
                                name="restaurant_state"
                                fullWidth
                                value={this.state.restaurant_state}
                                onChange={this.onChangeTextfield}
                                classes={{
                                    icon: classes.icon,
                                }}
                                style={{textAlign: 'left'}}
                            >
                                <MenuItem value={"Alabama"} classes={{ root: classes.selected }}>AL</MenuItem>
                                <MenuItem value={"Alaska"} classes={{ root: classes.selected }}>AK</MenuItem>
                                <MenuItem value={"Arizona"} classes={{ root: classes.selected }}>AZ</MenuItem>
                                <MenuItem value={"Arkansas"} classes={{ root: classes.selected }}>AR</MenuItem>
                                <MenuItem value={"California"} classes={{ root: classes.selected }}>CA</MenuItem>
                                <MenuItem value={"Colorado"} classes={{ root: classes.selected }}>CO</MenuItem>
                                <MenuItem value={"Connecticut"} classes={{ root: classes.selected }}>CT</MenuItem>
                                <MenuItem value={"Delaware"} classes={{ root: classes.selected }}>DE</MenuItem>
                                <MenuItem value={"Florida"} classes={{ root: classes.selected }}>FL</MenuItem>
                                <MenuItem value={"Georgia"} classes={{ root: classes.selected }}>GA</MenuItem>
                                <MenuItem value={"Hawaii"} classes={{ root: classes.selected }}>HI</MenuItem>
                                <MenuItem value={"Idaho"} classes={{ root: classes.selected }}>ID</MenuItem>
                                <MenuItem value={"Illinois"} classes={{ root: classes.selected }}>IL</MenuItem>
                                <MenuItem value={"Indiana"} classes={{ root: classes.selected }}>IN</MenuItem>
                                <MenuItem value={"Iowa"} classes={{ root: classes.selected }}>IA</MenuItem>
                                <MenuItem value={"Kansas"} classes={{ root: classes.selected }}>KS</MenuItem>
                                <MenuItem value={"Kentucky"} classes={{ root: classes.selected }}>KY</MenuItem>
                                <MenuItem value={"Louisiana"} classes={{ root: classes.selected }}>LA</MenuItem>
                                <MenuItem value={"Maine"} classes={{ root: classes.selected }}>ME</MenuItem>
                                <MenuItem value={"Maryland"} classes={{ root: classes.selected }}>MD</MenuItem>
                                <MenuItem value={"Massachusetts"} classes={{ root: classes.selected }}>MA</MenuItem>
                                <MenuItem value={"Michigan"} classes={{ root: classes.selected }}>MI</MenuItem>
                                <MenuItem value={"Minnesota"} classes={{ root: classes.selected }}>MN</MenuItem>
                                <MenuItem value={"Mississippi"} classes={{ root: classes.selected }}>MS</MenuItem>
                                <MenuItem value={"Missouri"} classes={{ root: classes.selected }}>MO</MenuItem>
                                <MenuItem value={"Montana"} classes={{ root: classes.selected }}>MT</MenuItem>
                                <MenuItem value={"Nebraska"} classes={{ root: classes.selected }}>NE</MenuItem>
                                <MenuItem value={"Nevada"} classes={{ root: classes.selected }}>NV</MenuItem>
                                <MenuItem value={"New Hampshire"} classes={{ root: classes.selected }}>NH</MenuItem>
                                <MenuItem value={"New Jersey"} classes={{ root: classes.selected }}>NJ</MenuItem>
                                <MenuItem value={"New Mexico"} classes={{ root: classes.selected }}>NM</MenuItem>
                                <MenuItem value={"New York"} classes={{ root: classes.selected }}>NY</MenuItem>
                                <MenuItem value={"North Carolina"} classes={{ root: classes.selected }}>NC</MenuItem>
                                <MenuItem value={"North Dakota"} classes={{ root: classes.selected }}>ND</MenuItem>
                                <MenuItem value={"Ohio"} classes={{ root: classes.selected }}>OH</MenuItem>
                                <MenuItem value={"Oklahoma"} classes={{ root: classes.selected }}>OK</MenuItem>
                                <MenuItem value={"Oregon"} classes={{ root: classes.selected }}>OR</MenuItem>
                                <MenuItem value={"Pennsylvania"} classes={{ root: classes.selected }}>PA</MenuItem>
                                <MenuItem value={"Rhode Island"} classes={{ root: classes.selected }}>RI</MenuItem>
                                <MenuItem value={"South Carolina"} classes={{ root: classes.selected }}>SC</MenuItem>
                                <MenuItem value={"South Dakota"} classes={{ root: classes.selected }}>SD</MenuItem>
                                <MenuItem value={"Tennessee"} classes={{ root: classes.selected }}>TN</MenuItem>
                                <MenuItem value={"Texas"} classes={{ root: classes.selected }}>TX</MenuItem>
                                <MenuItem value={"Utah"} classes={{ root: classes.selected }}>UT</MenuItem>
                                <MenuItem value={"Vermont"} classes={{ root: classes.selected }}>VT</MenuItem>
                                <MenuItem value={"Virginia"} classes={{ root: classes.selected }}>VA</MenuItem>
                                <MenuItem value={"Washington"} classes={{ root: classes.selected }}>WA</MenuItem>
                                <MenuItem value={"West Virginia"} classes={{ root: classes.selected }}>WV</MenuItem>
                                <MenuItem value={"Wisconsin"} classes={{ root: classes.selected }}>WI</MenuItem>
                                <MenuItem value={"Wyoming"} classes={{ root: classes.selected }}>WY</MenuItem>
                            </Select>
                            {!this.state.restaurant_state ? (<FormHelperText>{this.state.helperTextRestaurantState}</FormHelperText>) : null}
                        </FormControl>

                        <FormControl>
                            <TextField
                                id="zip_code"
                                label="ZIP Code"
                                type="numbers"
                                name="restaurant_zip"
                                fullWidth
                                error={this.state.errorRestaurantZip}
                                helperText={this.state.helperTextRestaurantZip}
                                value={this.state.restaurant_zip}
                                onChange={this.onChangeTextfield}
                            />
                        </FormControl>

                        {/* break between Zip code and checked1 */}
                        <br/>

                        <FormControl>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={this.state.isChecked1}
                                        onChange={this.onChangeCheckBox}
                                        value={this.state.isChecked1}
                                        name="isChecked1"

                                        // classes linked to const with classes, and root and checked from styles
                                        classes={{
                                            root: classes.root,
                                            checked: classes.checked,
                                        }}
                                    />
                                }

                                label="I affirm to be the current Manager of this establishment." 
                                style={{textAlign: 'left'}}
                            />
                        </FormControl>
                        
                        <FormControl>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={this.state.isChecked2}
                                        onChange={this.onChangeCheckBox}
                                        value={this.state.isChecked2}
                                        name="isChecked2"

                                        //classes linked to const with classes, and root and checked from styles
                                        classes={{root: classes.root, checked: classes.checked}}
                                    />
                                } 
                                style={{textAlign: 'left'}}
                                label={
                                    <div>
                                        <span>I accept the </span>
                                            <Link to={termsOfUse} target="_blank" className="linkService">terms of use</Link>
                                        <span> & </span>
                                            <Link to={'/privacy'} target="_blank" className="linkService">privacy policy</Link>
                                    </div>
                                }
                            />
                        </FormControl>
                    </MuiThemeProvider>

                    <div className="signUp_button_two_Container">
                        <button type="submit" className="signUp_button_two" onClick={this.handleSignUp}>SIGN UP</button>
                    </div>
                    
                    {this.renderRedirect()}
                    
                </Form>
                
                <Link to={'/'} className="link" aria-label="Back to home"><IoChevronBack className="Back_button_SignUp"/></Link>
            </div>
        )
    }
}

//exported with the styles for the white colored check boxes
export default withStyles(styles) (SignUp);