import React, {Component} from 'react'
import {Link, Navigate} from 'react-router-dom'
import {IoChevronBack} from 'react-icons/io5'
import {AiOutlineMail} from 'react-icons/ai'
import {Form, InputGroup} from 'react-bootstrap'
import { Spring, animated } from 'react-spring';
import Axios from 'axios';

class ForgotPassword extends Component{
    
    constructor(props) {
        super(props);
 
    //Initial State
        this.state = ({
            email: "",
            isValid: false,
            enterCode: false,
            redirect: false,
            error: "",
            one: "",
            two: "",
            three: "",
            four: "",
            isValidCode: false,
            code: "",
            nodesTogether: "",
            enterEmailDisplay: true,
            user: "",
            btnDisplay: true,
        });
    }

    refreshPage = () => {
        window.location.reload(false);
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

    verifyCredentials = (e) =>{
        e.preventDefault();
        
        // Authenticate username and password
        Axios.post('http://localhost:3001/Forgot/Email', {
            email: this.state.email
        }).then(res => {

            console.log(res);

            //save random 4 digit code for authentication
            if(res.data.code){
                this.setState({
                    code: res.data.code
                });
            }

            console.log(this.state.code);
            if(res.data.auth !== true || res.data === ""){
                this.setState({
                    helperTextEmail: 'This is not a valid email!',
                    errorEmail: true,
                    isValid: false,
                });
            }else if (this.state.isValid === true){
                this.setState({                    
                    enterCode: true,
                    btnDisplay:true,
                    enterEmailDisplay: false
                });
        }}).catch(error => {
            this.setState({
                error: `${error}`
            })
            if(this.state.error !== ''){
                this.setState({
                    helperTextEmail: 'Email could not be found!',
                    errorEmail: true,
                    isValid: false,
                });
            }
            
        });
        
    }

    onChangeCode = (e) =>{
        let field = e.target.name;
        let value = e.target.value;
        
        this.setState({
            [field]: value,
            errorCode: false,
            helperTextCode: '',
        })
        
        //code for the the next and previous node
        if (value.length >= e.target.getAttribute("maxlength")) {
            if(value !== this.state.four){
                e.target.nextElementSibling.focus();
            }
        }else if(value.length <= e.target.getAttribute("maxlength")){
            if(value !== this.state.two){
                e.target.previousElementSibling.focus();
            }
        }
    }

    handleContinueCode = () => {
        if(this.state.isValidCode === false){
            this.setState({
                isValidCode: true
            })
        }

        if(this.state.one === '' || this.state.two === '' || this.state.three === '' || this.state.four === ''){
            this.setState({
                helperTextCode: 'Fields cannot be empty!',
                errorCode: true,
                isValidCode: false
            });
        }else if(!(this.state.one || this.state.two || this.state.three || this.state.four).match(/^[0-9]+$/)){
            this.setState({
                helperTextCode: 'Fields can only have numbers!',
                errorCode: true,
                isValidCode: false
            });
        }else{
            const nodesTogether = parseInt(this.state.one + this.state.two + this.state.three + this.state.four);
            this.setState({
                nodesTogether: nodesTogether
            })
        }
    }

    handleKeyPressContinueCode = (e) =>{
        if (e.key === "Enter"){
            this.handleContinueCode()
        }
    }

    validateCode = (e) =>{
        e.preventDefault();
        if(this.state.code !== "" && this.state.nodesTogether !== ""){

            if(this.state.nodesTogether === this.state.code){

                Axios.get('http://localhost:3001/Auth/Login')
                .then(res => {
                    console.log(res)
                    if (res.data.LoggedIn === true){
                        this.setState({
                            redirect: true,
                            user: res.data.username
                        });
                    }else if (res.data.message === "Tokens not present"){
                        this.refreshPage()
                    }
                })
            }else{
                this.setState({
                    helperTextCode: 'Incorrect Code!',
                    errorCode: true,
                    isValidCode: false
                });
            }
        }
    }


    renderRedirect = () =>{
        if (this.state.redirect === true){
            return <Navigate  to={'/ResetPassword/'+ this.state.user} />
        }
    }
    
    render() {
        if(this.state.enterEmailDisplay === true){
            return (
                <div className="forgotContainer" style={{width: '500px'}}>

                    <div className="forgotPasswordTitleContainer">
                        <h1 className="forgotTitleText"><b>Forgot</b></h1>
                        <h1 className="passwordTitleText"><b>Password?</b></h1>
                    </div>
                                            
                    <div className="forgotPasswordTextContainer">
                        <p className="forgotPasswordText">
                            Enter your email for the verification process, we will send a 4 digit code to your email.
                        </p>
                    </div>

                    <Form onKeyPress={this.handleKeyPressContinue} onSubmit={this.verifyCredentials}>
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
                    </Form>

                    <Link to={"/"} className="link" aria-label="Back to home"><IoChevronBack className="Back_button_ForgotPassword"/></Link>   
                
                </div>
            );
        }else if (this.state.enterCode === true){
            return(
                <Spring from={{ opacity: 0, Transform: `flash(0%)`}} to={{ opacity: 1, Transform: `flash(100%)`}}>
                {style => (
                    <animated.div style={ style }>
                        
                        <div className="forgotContainer">
                         
                            <div className="forgotPasswordTitleContainer">
                                <h1 className="codeTitleText"><b>Enter Code</b></h1>
                            </div>
                            
                            <div className="forgotPasswordTextContainer" style={{width: '348px'}}>
                                <p className="forgotPasswordText">
                                    Enter the 4 digit code that you received on your email.
                                </p>
                            </div>

                            <Form onKeyPress={this.handleKeyPressContinueCode} onSubmit={this.validateCode}>
                                <div className="inputContainer">  
                                    <Form.Group className="codeBarContainer">
                                        <InputGroup className="forgotInputGroup">
                                            <Form.Control 
                                                type="text" 
                                                maxLength="1"
                                                className="codeBarText"
                                                name="one"
                                                value={this.state.one}   
                                                onChange={this.onChangeCode}
                                                isInvalid={this.state.errorCode}
                                                style={{borderTopRightRadius: '25px', borderBottomRightRadius: '25px', borderBottomLeftRadius: '25px', borderTopLeftRadius: '25px', display: 'inline-grid'}}
                                            />
                                            <Form.Control 
                                                type="text" 
                                                maxLength="1"
                                                className="codeBarText"
                                                name="two"
                                                value={this.state.two}    
                                                onChange={this.onChangeCode}
                                                isInvalid={this.state.errorCode}
                                                style={{borderTopRightRadius: '25px', borderBottomRightRadius: '25px', borderBottomLeftRadius: '25px', borderTopLeftRadius: '25px', display: 'inline-grid'}}
                                            />
                                            <Form.Control 
                                                type="text" 
                                                maxLength="1" 
                                                className="codeBarText" 
                                                name="three"
                                                value={this.state.three}  
                                                onChange={this.onChangeCode} 
                                                isInvalid={this.state.errorCode}
                                                style={{borderTopRightRadius: '25px', borderBottomRightRadius: '25px', borderBottomLeftRadius: '25px', borderTopLeftRadius: '25px', display: 'inline-grid'}}
                                            />
                                            <Form.Control 
                                                type="text" 
                                                maxLength="1" 
                                                className="codeBarText"
                                                name="four"
                                                value={this.state.four}
                                                onChange={this.onChangeCode} 
                                                isInvalid={this.state.errorCode}
                                                style={{borderTopRightRadius: '25px', borderBottomRightRadius: '25px', borderBottomLeftRadius: '25px', borderTopLeftRadius: '25px', display: 'inline-grid'}}
                                            />

                                            {this.state.helperTextCode === 'Incorrect Code!' ?
                                                <div className="invalid-tooltip" style={{position: 'static', marginTop: '0.7rem', width: 'fit-content'}}>
                                                    <span>{this.state.helperTextCode}</span>
                                                </div> 
                                                : 
                                                <div className="invalid-tooltip" style={{position: 'static', marginTop: '0.7rem', width: 'fit-content'}}>
                                                    <span>{this.state.helperTextCode}</span>
                                                </div>
                                            }

                                        </InputGroup>
                                    </Form.Group>
                
                                    <div className="input_and_login_Container">
                                        <button className="continue_button_forgotPassword" type="submit" onClick={this.handleContinueCode} >
                                            <b>CONTINUE</b>
                                        </button>
                                    </div>

                                </div>
                                {this.renderRedirect()}
                            </Form>
                            
                        </div>   
                        <IoChevronBack className="Back_button_EnterCode link" onClick={this.refreshPage}/>
                         
                    </animated.div>
                )}
                </Spring>     
            );    
        }
    }  
}

export default ForgotPassword;