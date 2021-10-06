import React, {Component} from 'react'
import {Link, Redirect} from 'react-router-dom'

import {IoChevronBack} from 'react-icons/io5'

import {Form} from 'react-bootstrap'


class ResetPassword extends Component{
    
    constructor(props) {
        super(props);

    //Initial State
        this.state = ({
            newPassword: "",
            confirmNewPassword: ""
        });
    
        this.handleNewPassword = this.handleNewPassword.bind(this);
        this.handleConfirmNewPassword = this.handleConfirmNewPassword.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleKeyPressSubmit = this.handleKeyPressSubmit.bind(this);
    }

    //Class Properties (Events On Change)
    handleNewPassword(e){
        let newPassword = e.target.value;
        this.setState({
            newPassword: newPassword
        })
      }
    
    handleConfirmNewPassword(e){
          let confirmNewPassword = e.target.value;
          this.setState({
            confirmNewPassword: confirmNewPassword
        })
    }


    handleSubmit(e){
        if (this.state.newPassword === '' && this.state.confirmNewPassword === ''){
            alert("You did not input anything")
            return;
        }else if(this.state.newPassword === '' || this.state.confirmNewPassword === ''){
            alert("Type your new password and confirm it")
            return;
        }else if(this.state.newPassword != this.state.confirmNewPassword){
            alert("Passwords do not match, please try again")
            return;
        }else if(this.state.newPassword === this.state.confirmNewPassword){
            this.setState({
                redirect: true
            }) 
        }
    }

    handleKeyPressSubmit(e){
        if (e.key === "Enter"){
            if (this.state.newPassword === '' && this.state.confirmNewPassword === ''){
                return;
            }else if(this.state.newPassword === '' || this.state.confirmNewPassword === ''){
                return;
            }else if(this.state.newPassword != this.state.confirmNewPassword){
                return;
            }else if(this.state.newPassword === this.state.confirmNewPassword){
                this.setState({
                    redirect: true
                }) 
            }
        }
    }

    renderRedirect(){
        if (this.state.redirect){
            alert("Your password has been changed!")
            return <Redirect to='/'/>
        }
    }
    
    
    render() {
        return (
            <div>
                <div className="forgotContainer">
                    <div className="forgotPasswordTitleContainer">
                        <h1 className="forgotTitleText"><b>Reset</b></h1>
                        <h1 className="passwordTitleText"><b>Password</b></h1>
                    </div>
                    <div>
                        <Form onKeyPress={this.handleKeyPressSubmit}>
                            <div className="forgotPasswordTextContainer">
                                <p className="forgotPasswordText">
                                Set the new password for your account so you can login and access all the features.
                                </p>
                            </div>

                            <Form.Group className="usernameBar">
                                        <Form.Control type="password" placeholder="New Password" className="usernameBarText" onChange={this.handleNewPassword}/>
                                </Form.Group>
                            
                                <Form.Group className="passwordBar">
                                    <Form.Control type="password"  placeholder="Confirm New Password" className="passwordBarText" onChange={this.handleConfirmNewPassword} />
                                </Form.Group>

                            <button className="continue_button_forgotPassword" type="submit"  onClick={this.handleSubmit} >
                                <b>SUBMIT</b>
                            </button>
                            {this.renderRedirect()}
                        </Form>
                    </div>
                </div>
                <Link to="/ForgotPassword" className="link"><IoChevronBack className="Back_button_ResetPassword"/></Link> 
            </div>           
        );
      }
    }

export default ResetPassword;