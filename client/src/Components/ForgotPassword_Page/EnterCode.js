import React, {Component} from 'react'
import {Link, Redirect} from 'react-router-dom'

import { IoChevronBack } from 'react-icons/io5'

import {Form} from 'react-bootstrap'

class EnterCode extends Component{
    
    constructor(props) {
        super(props);

    //Initial State
        this.state = ({
            one: "",
            two: "",
            three: "",
            four: "",
            isValid: false
        });
        
        this.handleContinue = this.handleContinue.bind(this);
        this.handleKeyPressContinue = this.handleKeyPressContinue.bind(this);
        this.onChangeCode = this.onChangeCode.bind(this);
    }

    onChangeCode(e){
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

    handleContinue(e){
        if(this.state.isValid === false){
            this.setState({
                isValid: true
            })
        }

        if(this.state.one === '' || this.state.two === '' || this.state.three === '' || this.state.four === ''){
            this.setState({
                helperTextCode: 'Fields cannot be empty!',
                errorCode: true,
                isValid: false
            });
        }else if(!(this.state.one || this.state.two || this.state.three || this.state.four).match(/^[0-9]+$/)){
            this.setState({
                helperTextCode: 'Fields can only have numbers!',
                errorCode: true,
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
    
            if(this.state.one === '' || this.state.two === '' || this.state.three === '' || this.state.four === ''){
                this.setState({
                    helperTextCode: 'Fields cannot be empty!',
                    errorCode: true,
                    isValid: false
                });
            }else if(!(this.state.one || this.state.two || this.state.three || this.state.four).match(/^[0-9]+$/)){
                this.setState({
                    helperTextCode: 'Fields can only have numbers!',
                    errorCode: true,
                    isValid: false
                });
            }
        }
    }

    validateCode = async e =>{
        e.preventDefault();

    }

    renderRedirect(){
        if (this.state.redirect){
            return <Redirect to='/ResetPassword'/>
        }
    }
    
    
    render() {
        return (
            <div>
                <div className="forgotContainer">
                    <div className="forgotPasswordTitleContainer">
                        <h1 className="codeTitleText"><b>Enter Code</b></h1>
                    </div>
                    <div>
                        <Form onKeyPress={this.handleKeyPressContinue} onSubmit={this.validateCode}>
                            <div className="forgotPasswordTextContainer">
                                <p className="forgotPasswordText">
                                Enter the 4 digit code that you received on your email.
                                </p>
                            </div>

                            <Form.Group className="codeBarContainer">
                                <Form.Control 
                                    type="text" 
                                    maxLength="1"
                                    className="codeOneBarText"
                                    name="one"
                                    value={this.state.one}   
                                    onChange={this.onChangeCode}
                                    isInvalid={this.state.errorCode} 
                                />
                                <Form.Control 
                                    type="text" 
                                    maxLength="1"
                                    className="codeTwoBarText"
                                    name="two"
                                    value={this.state.two}    
                                    onChange={this.onChangeCode}
                                    isInvalid={this.state.errorCode}  
                                />
                                <Form.Control 
                                    type="text" 
                                    maxLength="1" 
                                    className="codeThreeBarText" 
                                    name="three"
                                    value={this.state.three}  
                                    onChange={this.onChangeCode} 
                                    isInvalid={this.state.errorCode} 
                                />
                                <Form.Control 
                                    type="text" 
                                    maxLength="1" 
                                    className="codeFourBarText"
                                    name="four"
                                    value={this.state.four}
                                    onChange={this.onChangeCode} 
                                    isInvalid={this.state.errorCode} 
                                />
                                <Form.Control.Feedback type='invalid'>
                                    {this.state.helperTextCode}
                                </Form.Control.Feedback>
                            </Form.Group>

                            <button className="continue_button_forgotPassword" type="submit" onClick={this.handleContinue} >
                                <b>CONTINUE</b>
                            </button>
                            {this.renderRedirect()}
                        </Form>
                    </div>
                </div>   
                <Link to="/ForgotPassword" className="link"><IoChevronBack className="Back_button_EnterCode"/></Link>
            </div>      
        );
      }
    }

export default EnterCode;