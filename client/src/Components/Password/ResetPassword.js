import React, {Component} from 'react'
import {Link, Navigate} from 'react-router-dom'
import {RiLockPasswordLine} from 'react-icons/ri';
import {IoChevronBack} from 'react-icons/io5';
import {Form, InputGroup} from 'react-bootstrap';
import Axios from 'axios';
import {Mode} from '../../Stage/Mode';


class ResetPassword extends Component{
    
    constructor(props) {
        super(props);

    //Initial State
        this.state = ({
            newPassword: "",
            confirmPassword: "",
            helperTextPasswordLength: "Must be between 8 and 20 characters long ",
            helperTextPasswordUppercase: "Must contain at least one uppercase character",
            helperTextPasswordLowercase: "Must contain at least one lowercase character",
            helperTextPasswordNumber: "Must contain at least one number",
            helperTextPasswordSpecial: "Must contain special character(s) (e.g. !@$&$)",
            errorConfirmPassword: false,
            isValid: false,
            redirect: false,
            btnDisplay: true,
            mode: Mode(),
        });
    }

    //Class Properties (Events On Change)
    onChangeTextfield = (e) =>{
        let field = e.target.name;
        let value = e.target.value;
        this.setState({
            [field]: value,
            errorNewPassword: false,
            errorConfirmPassword: false,
            helperTextPasswordLength: 'Must be between 8 and 20 characters long',
            helperTextPasswordUppercase: 'Must contain at least one uppercase character',
            helperTextPasswordLowercase: 'Must contain at least one lowercase character',
            helperTextPasswordNumber: 'Must contain at least one number',
            helperTextPasswordSpecial: 'Must contain special character(s) (e.g. !@$&$)',
            helperTextConfirmPassword: '',
            btnDisplay: false,
        });
    }

    handlePasswords = () =>{

        // Validators for username and password
        if(this.state.isValid === false){
            this.setState({
                helperTextPasswordLength: '',
                helperTextPasswordUppercase: '',
                helperTextPasswordLowercase: '',
                helperTextPasswordNumber: '',
                helperTextPasswordSpecial: '',
                isValid: true
            })
        }

         // Validators -> password
         if(this.state.newPassword.length === 0 || this.state.confirmPassword.length === 0){
            this.setState({
                helperTextPasswordLength: 'Field(s) cannot be empty!',
                helperTextPasswordUppercase: '',
                helperTextPasswordLowercase: '',
                helperTextPasswordNumber: '',
                helperTextPasswordSpecial: '',
                errorNewPassword: true,
                errorConfirmPassword: true,
                isValid: false
            });
        }else if(this.state.newPassword.length < 8){
            this.setState({
                helperTextPasswordLength: 'Password is too short!',
                helperTextPasswordUppercase: '',
                helperTextPasswordLowercase: '',
                helperTextPasswordNumber: '',
                helperTextPasswordSpecial: '',
                errorNewPassword: true,
                errorConfirmPassword: true,
                isValid: false
            });
        }else if(this.state.newPassword.length > 20){
            this.setState({
                helperTextPasswordLength: 'Password is too long!',
                helperTextPasswordUppercase: '',
                helperTextPasswordLowercase: '',
                helperTextPasswordNumber: '',
                helperTextPasswordSpecial: '',
                errorNewPassword: true,
                errorConfirmPassword: true,
                isValid: false
            });
        }else if((this.state.newPassword).match(/[\s]/)){
            this.setState({
                helperTextPasswordLength: '',
                helperTextPasswordUppercase: '',
                helperTextPasswordLowercase: '',
                helperTextPasswordNumber: '',
                helperTextPasswordSpecial: 'Password cannot contain whitespaces!',
                errorNewPassword: true,
                errorConfirmPassword: true,
                isValid: false
            });
        }else if(!(this.state.newPassword).match(/[A-Z]/)){
            this.setState({
                helperTextPasswordLength: '',
                helperTextPasswordUppercase: 'Must contain at least one uppercase character!',
                helperTextPasswordLowercase: '',
                helperTextPasswordNumber: '',
                helperTextPasswordSpecial: '',
                errorNewPassword: true,
                errorConfirmPassword: true,
                isValid: false
            });
        }else if(!(this.state.newPassword).match(/[a-z]/)){
            this.setState({
                helperTextPasswordLength: '',
                helperTextPasswordUppercase: '',
                helperTextPasswordLowercase: 'Must contain at least one lowercase character!',
                helperTextPasswordNumber: '',
                helperTextPasswordSpecial: '',
                errorNewPassword: true,
                errorConfirmPassword: true,
                isValid: false
            });
        }else if(!(this.state.newPassword).match(/[0-9]/)){
            this.setState({
                helperTextPasswordLength: '',
                helperTextPasswordUppercase: '',
                helperTextPasswordLowercase: '',
                helperTextPasswordNumber: 'Must contain at least one number!',
                helperTextPasswordSpecial: '',
                errorNewPassword: true,
                errorConfirmPassword: true,
                isValid: false
            });
        }else if(!(this.state.newPassword).match(/[^\w\s]/)){
            this.setState({
                helperTextPasswordLength: '',
                helperTextPasswordUppercase: '',
                helperTextPasswordLowercase: '',
                helperTextPasswordNumber: '',
                helperTextPasswordSpecial: 'Must contain special character(s) (e.g. !@$&$)',
                errorNewPassword: true,
                errorConfirmPassword: true,
                isValid: false
            });
        }else if(this.state.confirmPassword !== this.state.newPassword){
            this.setState({
                helperTextConfirmPassword: 'Passwords do not match!',
                errorConfirmPassword: true,
                isValid: false
            });
        }

    }

    handleKeyPressPasswords = (e) =>{
         // Validators for username and password when Enter key is pressed
        if (e.key === "Enter"){
            this.handlePasswords()
        }
    }

    handleSubmit = (e) =>{
        e.preventDefault();
        if(this.state.isValid === true && this.state.confirmPassword === this.state.newPassword){

            Axios.put(`${this.state.mode}/Forgot/Email`, {
                newPassword: this.state.newPassword
            }).then(res => {
                if (res.data.auth === true){
                    this.setState({
                        redirect: true
                    }) 
                }else{
                    return <Navigate  to='/forgot'/>
                }
            })
        }
    }

    renderRedirect = () =>{
        if (this.state.redirect){
            alert("Your password has been changed!")
            return <Navigate  to='/login'/>
        }
    }
    
    render() {
        return (
            <div className="forgotContainer">

                <div className="forgotPasswordTitleContainer">
                    <h1 className="forgotTitleText"><b>Reset</b></h1>
                    <h1 className="passwordTitleText"><b>Password</b></h1>
                </div>

                <div className="forgotPasswordTextContainer">
                    <p className="forgotPasswordText">
                        Set the new password for your account so you can login and access all the features.
                    </p>
                </div>

                <Form onKeyPress={this.handleKeyPressPasswords} onSubmit={this.handleSubmit}>
                    <div className="inputContainer">
                        <Form.Group className="contentBar">
                            <InputGroup>
                                <InputGroup.Text><RiLockPasswordLine/></InputGroup.Text>
                                <Form.Control 
                                    type="password" 
                                    placeholder="New Password" 
                                    name="newPassword"
                                    className="contentBarText" 
                                    value={this.state.newPassword}
                                    onChange={this.onChangeTextfield}
                                    isInvalid={this.state.errorNewPassword}
                                />
                            </InputGroup>
                        </Form.Group>
                            
                        <Form.Group className="contentBar">
                            <InputGroup>
                                <InputGroup.Text><RiLockPasswordLine/></InputGroup.Text>
                                <Form.Control 
                                    type="password"  
                                    placeholder="Confirm New Password"
                                    name="confirmPassword"
                                    className="contentBarText"
                                    value={this.state.confirmPassword}
                                    onChange={this.onChangeTextfield}
                                    isInvalid={this.state.errorConfirmPassword}
                                    style={{borderTopRightRadius: '25px', borderBottomRightRadius: '25px', borderBottomLeftRadius: 0, borderTopLeftRadius: 0, display: 'inline-grid',  width: '89%'}}
                                />
                                {/* Make the requirements only pop up when the first field is empty and while confirmation for the second field remains false */}
                                {this.state.errorConfirmPassword === true ?
                                
                                    <div className="invalid-tooltip" style={{position: 'static', marginTop: '0.3rem', width: 'fit-content'}}>
                                        <span>
                                            {this.state.helperTextPasswordLength}
                                            {this.state.helperTextPasswordUppercase}
                                            {this.state.helperTextPasswordLowercase}
                                            {this.state.helperTextPasswordNumber}
                                            {this.state.helperTextPasswordSpecial}
                                            {this.state.helperTextConfirmPassword}
                                        </span>
                                    </div> 
                                :
                                    <span className="reqContainer">
                                        <span className="requirements">{this.state.helperTextPasswordLength}</span>
                                        <span className="requirements">{this.state.helperTextPasswordUppercase}</span>
                                        <span className="requirements">{this.state.helperTextPasswordLowercase}</span>
                                        <span className="requirements">{this.state.helperTextPasswordNumber}</span>
                                        <span className="requirements">{this.state.helperTextPasswordSpecial}</span>
                                        <span className="requirements">{this.state.helperTextConfirmPassword}</span>
                                    </span>
                                }
                                    
                            </InputGroup>
                        </Form.Group>

                        <div className="input_and_login_Container">
                            <button className="continue_button_forgotPassword" type="submit" disabled={this.state.btnDisplay} onClick={this.handlePasswords}> <b>SUBMIT</b> </button>
                        </div>

                        {this.renderRedirect()}
                    </div> 
                </Form>
                
                <Link to={'/forgot'} className="link" aria-label="Back to forgot password"><IoChevronBack className="Back_button"/></Link> 
            </div>           
        );
    }
}

    export default ResetPassword;