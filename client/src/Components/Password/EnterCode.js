import React, {Component} from 'react'
import {Link, Navigate} from 'react-router-dom'
import {IoChevronBack} from 'react-icons/io5'
import {Form, InputGroup} from 'react-bootstrap'
import Axios from 'axios';
import {Mode} from '../../Stage/Mode';

Axios.defaults.withCredentials = true;

class EnterCode extends Component{
    
    constructor(props) {
        super(props);
 
    //Initial State
        this.state = ({
            username: '',
            redirect: false,
            error: "",
            one: "",
            two: "",
            three: "",
            four: "",
            isValidCode: false,
            code: "",
            nodesTogether: "",
            mode: Mode(),
            token: true,
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

    // send email with code
    sendCode = () =>{
        Axios.post(`${this.state.mode}/Forgot/send`)
        .then(res => {
            // console.log(res)
            this.setState({
                code: res.data.code,
            });
        }).catch(error => {
            if (error.response.status === 401){
                this.setState({
                    token: false
                });
            }
        })
    }


    handleContinueCode = () => {
        if(this.state.isValidCode === false){
            this.setState({
                isValidCode: true
            })
        }

        if(this.state.code === ''){
            this.setState({
                helperTextCode: 'You must send a code first!',
                errorCode: true,
                isValidCode: false
            });
        }else if(this.state.one === '' || this.state.two === '' || this.state.three === '' || this.state.four === ''){
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

    // validate code in server
    validateCode =  async (e) =>{
        e.preventDefault();

        if(this.state.code !== "" && this.state.nodesTogether !== ""){
            await Axios.post(`${this.state.mode}/Forgot/validate`, {
                code: this.state.code,
                nodesTogether: this.state.nodesTogether
            }).then(res => {
                // console.log(res)
                this.setState({                    
                    redirect: res.data.auth,
                });
            }).catch(error => {
                if(error.response.status === 400){
                    this.setState({
                        helperTextCode: error.response.data.error,
                        errorCode: true,
                        isValidCode: false
                    });
                }else if (error.response.status === 401){
                    this.setState({
                        token: false
                    });
                }
            });
        }
    }

    // redirect to reset password page
    renderRedirect = () =>{
        if (this.state.redirect === true){
            return <Navigate  to={`/reset/${this.state.username}`} />
        }
    }
        
    renderEnterCode = () =>{
        return(
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
                            <button className="continue_button_forgotPassword" type="button" onClick={this.sendCode}> <b>SEND CODE</b> </button>
                            <button className="continue_button_forgotPassword" type="submit" onClick={this.handleContinueCode}> <b>CONTINUE</b> </button>
                        </div>
                    </div>
                    {this.renderRedirect()}
                </Form>
                <Link to={"/forgot"} className="link" aria-label="Back to login"><IoChevronBack className="Back_button"/></Link>
            </div>   
        );
    }  

    componentDidMount(){
        this.checkUserAuth()
    }

    // authenticate cookie
    checkUserAuth() {
        Axios.get(`${this.state.mode}/Forgot/auth`)
        .then(res => {
            this.setState({
                username: res.data.username
            });
        }).catch(error => {
            if (error.response.status === 401){
                this.setState({
                    token: false
                });
            }
        })
    }   

    render(){
        
        return ( 
            <div className="eventTransition">
                {this.state.token ? this.renderEnterCode() : <Navigate to={'/404'}/>}
            </div>
        )
    }
}

export default EnterCode;