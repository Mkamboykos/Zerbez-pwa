import React, {Component} from 'react'
import {Link, Redirect} from 'react-router-dom'
import {IoChevronBack} from 'react-icons/io5'
import {Form} from 'react-bootstrap'
import Axios from 'axios';

class ForgotPassword extends Component{
    
    constructor(props) {
        super(props);

    //Initial State
        this.state = ({
            email: "",
            isValid: false,
            redirect: false
        });
    
        this.handleEmail = this.handleEmail.bind(this);
        this.handleContinue = this.handleContinue.bind(this);
        this.handleKeyPressContinue = this.handleKeyPressContinue.bind(this);
    }

    //Class Properties (Events On Change)
    handleEmail(e){
        let field = e.target.name;
        let value = e.target.value;
        this.setState({
            [field]: value,
            errorEmail: false,
            helperTextEmail: '',
        })
    }


    handleContinue(e){
        // Validators for email
        if(this.state.isValid === false){
            this.setState({
                isValid: true
            })
        }

        // Validators -> email
        if(this.state.email === ""){
            this.setState({
                helperTextEmail: 'Field cannot be empty!',
                errorEmail: true,
                isValid: false
            });
        }else if(!(this.state.email).match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)){
            this.setState({
                helperTextEmail: 'This is not a valid email!',
                errorEmail: true,
                isValid: false
            });
        }
    }

    handleKeyPressContinue(e){
        if (e.key === "Enter"){
            e.preventDefault();

            if(this.state.isValid === false){
                this.setState({
                    isValid: true
                })
            }

        // Validators -> email
        if(this.state.email === ""){
            this.setState({
                helperTextEmail: 'Field cannot be empty!',
                errorEmail: true,
                isValid: false
            });
        }else if(!(this.state.email).match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)){
            this.setState({
                helperTextEmail: 'This is not a valid email!',
                errorEmail: true,
                isValid: false
            });
        }
        }
    }

    verifyCredentials = async e =>{
        e.preventDefault();

        // Authenticate username and password
        await Axios.post('http://localhost:3001/ForgotPassword/Email', {
            email: this.state.email
        }).then(res => {  
            if(res.data.email !== this.state.email || res.data.email === ""){
                this.setState({
                    helperText: 'Invalid email!',
                    errorEmail: true,
                    isValid: false,
                });
            }else if (this.state.isValid === true){
                this.setState({                    
                    redirect: true
                });
            }
        });
    }

    renderRedirect(){
        if (this.state.redirect){
            return <Redirect to='/EnterCode'/>
        }
    }
    
    
    render() {
        return (
            <div>
                <div className="forgotContainer">
                    <div className="forgotPasswordTitleContainer">
                        <h1 className="forgotTitleText"><b>Forgot</b></h1>
                        <h1 className="passwordTitleText"><b>Password?</b></h1>
                    </div>
                    <div>
                        <Form onKeyPress={this.handleKeyPressContinue} onSubmit={this.verifyCredentials}>
                            <div className="forgotPasswordTextContainer">
                                <p className="forgotPasswordText">
                                    Enter your email for the verification process, we will send a 4 digit code to your email.
                                </p>
                            </div>

                            <Form.Group className="passwordBar">
                                <Form.Control 
                                    type="email"
                                    placeholder="Email" 
                                    name="email"
                                    value={this.state.email}
                                    className="passwordBarText" 
                                    onChange={this.handleEmail}
                                    isInvalid={this.state.errorEmail} 
                                />
                                <Form.Control.Feedback type='invalid'>
                                    {this.state.helperTextEmail}
                                </Form.Control.Feedback>
                            </Form.Group>

                            <button className="continue_button_forgotPassword" type="submit"  onClick={this.handleContinue} >
                                <b>CONTINUE</b>
                            </button>
                            {this.renderRedirect()}
                        </Form>
                    </div>
                </div>
                <Link to="/" className="link"><IoChevronBack className="Back_button_ForgotPassword"/></Link>   
            </div>    
        );
      }
    }

export default ForgotPassword;