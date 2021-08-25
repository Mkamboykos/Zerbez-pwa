import React, {Component} from 'react'
import {Link, Redirect} from 'react-router-dom'
import {IoChevronBack} from 'react-icons/io5'
import {Form} from 'react-bootstrap'

class ForgotPassword extends Component{
    
    constructor(props) {
        super(props);

    //Initial State
        this.state = ({
            email: ""
        });
    
        this.handleEmail = this.handleEmail.bind(this);
        this.handleContinue = this.handleContinue.bind(this);
        this.handleKeyPressContinue = this.handleKeyPressContinue.bind(this);
    }

    //Class Properties (Events On Change)
    handleEmail(e){
          let email = e.target.value;
          this.setState({
            email: email
        })
    }


    handleContinue(e){
        if(this.state.email === ''){
            alert("You did not provide a valid email")
            return;
        }else if(this.state.email === this.state.email){
            this.setState({
                redirect: true
            }) 
        }
    }

    handleKeyPressContinue(e){
        if (e.key === "Enter"){
            if(this.state.email === ''){
                return;
            }else if(this.state.email === this.state.email){
                this.setState({
                    redirect: true
                }) 
            }
        }
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
                        <Form onKeyPress={this.handleKeyPressContinue}>
                            <div className="forgotPasswordTextContainer">
                                <p className="forgotPasswordText">
                                    Enter your email for the verification process, we will send a 4 digit code to your email.
                                </p>
                            </div>

                            <Form.Group className="passwordBar">
                                <Form.Control type="email"  placeholder="Email" className="passwordBarText" onChange={this.handleEmail} />
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