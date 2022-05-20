import React, {Component} from 'react'
import {Link, Navigate} from 'react-router-dom'
import {IoChevronBack} from 'react-icons/io5'
import {AiOutlineMail} from 'react-icons/ai'
import {Form, InputGroup} from 'react-bootstrap'
import Axios from 'axios';
import {Mode} from '../../Mode/Mode';

Axios.defaults.withCredentials = true;

class ForgotPassword extends Component{
    
    constructor(props) {
        super(props);
 
    //Initial State
        this.state = ({
            email: "",
            isValid: false,
            redirect: false,
            user: "",
            btnDisplay: true,
            mode: Mode(),
        });
    }

    //Class Properties (Events On Change)
    handleEmail = (e) =>{
        let field = e.target.name;
        let value = e.target.value;
        this.setState({
            [field]: value,
            errorEmail: false,
            helperTextEmail: '',
            btnDisplay: false,
        })
    }

    handleContinue = () =>{
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
        }else if(!(this.state.email).match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)){   // eslint-disable-line
            this.setState({
                helperTextEmail: 'This is not a valid email!',
                errorEmail: true,
                isValid: false
            });
        }
    }

    handleKeyPressContinue = (e) =>{
        if (e.key === "Enter"){
            this.handleContinue()
        }
    }

    verifyEmail = async (e) =>{
        e.preventDefault();

        if (this.state.isValid === true){

            await Axios.post(`${this.state.mode}/Forgot/verify`, {
                email: this.state.email
            }).then(res => {
                if (res.status === 200){
                    this.setState({                    
                        redirect: true,
                        user: res.data.user
                    });
                }
            }).catch(error => {
                if (error.response.status === 404){
                    this.setState({
                        helperTextEmail: `${error.response.data.error}`,
                        errorEmail: true,
                        isValid: false,
                    });
                }
            });
        }
    }

    renderRedirect = () =>{
        if (this.state.redirect === true){
            return <Navigate  to={`/forgot/${this.state.user}/code`} />
        }
    }
    
    renderEmail = () =>{
        return(
           <div className="forgotContainer">

               <div className="forgotPasswordTitleContainer">
                   <h1 className="forgotTitleText"><b>Forgot</b></h1>
                   <h1 className="passwordTitleText"><b>Password?</b></h1>
               </div>
                                       
               <div className="forgotPasswordTextContainer">
                   <p className="forgotPasswordText">
                       Enter your email for the verification process, we will send a 4 digit code to your email.
                   </p>
               </div>

               <Form onKeyPress={this.handleKeyPressContinue} onSubmit={this.verifyEmail}>
                   <div className="inputContainer">  
                       <Form.Group className="contentBarPassword">
                           <InputGroup className="forgotInputGroup">
                               <InputGroup.Text style={{display: 'inline-block'}}><AiOutlineMail/></InputGroup.Text>
                               <Form.Control
                                   type="email"
                                   placeholder="Email" 
                                   name="email"
                                   value={this.state.email}
                                   className="contentBarText" 
                                   onChange={this.handleEmail}
                                   isInvalid={this.state.errorEmail}
                                   style={{borderTopRightRadius: '25px', borderBottomRightRadius: '25px', borderBottomLeftRadius: 0, borderTopLeftRadius: 0, display: 'inline-grid', width: '89%'}}
                               />
                               <div className="invalid-tooltip" style={{position: 'static', marginTop: '0.3rem', width: 'fit-content'}}>
                                   <span>{this.state.helperTextEmail}</span>
                               </div>
                           </InputGroup>
                       </Form.Group>  
                   
                       <div className="input_and_login_Container">
                           <button className="continue_button_forgotPassword" type="submit" disabled={this.state.btnDisplay} onClick={this.handleContinue}> <b>CONTINUE</b> </button>
                       </div>
                  </div>
                  {this.renderRedirect()}
               </Form>
               
               <Link to={"/login"} className="link" aria-label="Back to login"><IoChevronBack className="Back_button"/></Link>
           </div>
       );
    }
    
    render(){
        return ( 
            <div>
                {this.renderEmail()} 
            </div>
        )
    }
}

export default ForgotPassword;