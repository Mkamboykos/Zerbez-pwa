import React, {Component} from 'react'
import {Link, Redirect} from 'react-router-dom'
import { Spring, animated } from 'react-spring';
import {Form} from 'react-bootstrap'
import Axios from 'axios';

class Home extends Component{
    
    constructor(props) {
        super(props);

    //Initial State
        this.state = ({
            
            username: "",
            password: "",

            captcha: "",
            userCaptcha: "",
            loginDisplay: true,
            capChaDisplay: false,
            btnDisplay: false,
            redirect: false,
            isValid: false,
        });
    
        this.handleLogin = this.handleLogin.bind(this);
        this.handleCaptcha = this.handleCaptcha.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleKeyPressSubmit = this.handleKeyPressSubmit.bind(this);
        this.onChangeTextfield = this.onChangeTextfield.bind(this);
        this.handleKeyPressLogin = this.handleKeyPressLogin.bind(this);
    }

    onChangeTextfield(e){
        let field = e.target.name;
        let value = e.target.value;
        this.setState({
            [field]: value,
            errorUsername: false,
            errorPassword: false,
            helperText: '',
        });
    }
    
    handleLogin(){
        // Validators for username and password
        if(this.state.isValid === false){
            this.setState({
                isValid: true
            })
        }
        
        if(this.state.username === ""){
            this.setState({
                helperText: 'Fields cannot be empty!',
                errorUsername: true,
                isValid: false
            });
        }

        if(this.state.password === ""){
            this.setState({
                helperText: 'Fields cannot be empty!',
                errorPassword: true,
                isValid: false
            });
        }
    }

    handleKeyPressLogin(e){
        // Validators for username and password when Enter key is pressed
        if (e.key === "Enter"){
            e.preventDefault();

            if(this.state.isValid === false){
                this.setState({
                    isValid: true
                })
            }

            // Validators
            if(this.state.username === ""){
                this.setState({
                    helperText: 'Fields cannot be empty!',
                    errorUsername: true,
                    isValid: false
                });
            }

            if(this.state.password === ""){
                this.setState({
                    helperText: 'Fields cannot be empty!',
                    errorPassword: true,
                    isValid: false
                });
            }
            document.getElementById("loginButton").click();
        }
    }

    handleCaptcha(e){
        let userCaptcha = e.target.value
        if(!userCaptcha)
            return;
            this.setState({
                btnDisplay: false,
                userCaptcha: userCaptcha
            })
    }

    handleKeyPressSubmit(e){
        if (e.key === "Enter"){
            e.preventDefault();
            if(this.state.userCaptcha === ''){
                alert("You must enter the CAPTCHA Code provided")
            }else if(this.state.userCaptcha != this.state.captcha){
                alert("Incorrect CAPTCHA, please try again")
            }else if(this.state.userCaptcha === this.state.captcha){
                this.setState({
                    redirect: true
                }) 
            }
        }
    }

    handleSubmit(e){
        e.preventDefault();
        if(this.state.userCaptcha === ''){
            alert("You must enter the CAPTCHA Code provided")
        }else if(this.state.userCaptcha != this.state.captcha){
            alert("Incorrect CAPTCHA, please try again")
        }else if(this.state.userCaptcha === this.state.captcha){
            this.setState({
                redirect: true
            }) 
        }
    }


    verifyCredentials = async e =>{
        e.preventDefault();

        // verify username and password
        Axios.post('http://localhost:3001/login', {
            username: this.state.username,
            password: this.state.password,
        }).then(res => {  
            if(res.data.length !== 1){
                this.setState({
                    helperText: 'Username or Password is incorrect!',
                    errorUsername: true,
                    errorPassword: true,
                    isValid: false,
                });
            }else{
                this.setState({                    
                    capChaDisplay: true,
                    btnDisplay:true,
                    loginDisplay:false
                });
                let random = Math.random().toString(36).substring(7);
                this.setState({
                    captcha: random
                })
            }
        });
    }
    

    renderRedirect(){
        if (this.state.redirect) {
            return <Redirect to='/Dashboard' />
        }
    }
    
    renderCaptcha(){
        return(
            <div className="captchaContainer">
                <Form onKeyPress={this.handleKeyPressSubmit} >
                    <Form.Group controlId="formPlaintextEmail" className="captchaBar">
                        <Form.Label className="captchaText">
                            {this.state.captcha}
                        </Form.Label>
                        <Form.Control 
                            type="text" 
                            className="captchaBar"
                            placeholder="Enter Captcha" 
                            onChange={this.handleCaptcha} 
                        />
                    </Form.Group>
                  
                    <div>
                        <button className="Submit_button_Home" type="save" disabled={this.state.btnDisplay} onClick={this.handleSubmit} >
                            <b>SUBMIT</b>
                        </button>
                    </div>
                    {this.renderRedirect()}
                </Form>
            </div>
        ) 
    }

    renderLogin(){
        return(
            <div>
                <Form onKeyPress={this.handleKeyPressLogin} onSubmit={this.verifyCredentials}>    

                    <div className="homePageImageContainer">
                        <p>Insert Image Here</p>
                    </div>

                    <div className="inputContainer">  
                        <Form.Group className="usernameBar">
                            <Form.Control 
                                type="username" 
                                placeholder="Username"
                                name="username"
                                value={this.state.username}
                                className="usernameBarText" 
                                onChange={this.onChangeTextfield}
                                isInvalid={this.state.errorUsername}
                            />
                        </Form.Group>
                            
                        <Form.Group className="passwordBar">
                            <Form.Control 
                                type="password"  
                                placeholder="Password"
                                name="password"
                                value={this.state.password}
                                className="passwordBarText" 
                                onChange={this.onChangeTextfield}
                                isInvalid={this.state.errorPassword}
                            />
                            <Form.Control.Feedback type='invalid'>
                                {this.state.helperText}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <div className="input_and_login_Container">
                            <Link to="/SignUp" className="link"><button className="signUp_button_home"><b>SIGN UP</b></button></Link>
                                
                            <button className="login_button_home" type="submit" id="loginButton" onClick={this.handleLogin}><b>LOGIN</b></button>
                        </div>
                        <div className="forgotpasswordContainer">
                            <Link to="/ForgotPassword" className="link"><b>Forgot Password?</b></Link>
                        </div>                     
                    </div>
                </Form> 
            </div>
        )
    }

    render() {
        if (this.state.loginDisplay){
            return (
                <Spring from={{ opacity: 1, Transform:`flash(0%)`}} to={{ opacity: 0, Transform:`flash(100%)`}}>
                {style => (    
                    <div className="homePageContainer">
                        <div className="HomePageTitleContainer">
                            <h1 className="homeTitleTimeText"><b>Time</b></h1>
                            <h1 className="homeTitleWaiterText"><b>Waiter</b></h1>
                        </div>
                        <animated.div>
                            {this.state.loginDisplay?this.renderLogin():""}
                        </animated.div>
                    </div>
                )}
                </Spring>
            )
        } else if (this.state.capChaDisplay){
            return (
                <Spring from={{ opacity: 0, Transform: `flash(0%)`}} to={{ opacity: 1, Transform: `flash(100%)`}}>
                {style => (
                    <div className="homePageContainer" >
                        <div className="HomePageTitleContainer">
                            <h1 className="homeTitleTimeText"><b>Time</b></h1>
                            <h1 className="homeTitleWaiterText"><b>Waiter</b></h1>
                        </div>
                            <animated.div style={ style } className="transitionCapchaContainer">
                                {this.state.capChaDisplay?this.renderCaptcha():""}
                            </animated.div>
                        </div>
                )}
                </Spring>
            )
        }
    }
}

export default Home;