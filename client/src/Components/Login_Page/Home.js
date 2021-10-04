import React, {Component} from 'react'
import {Link, Redirect} from 'react-router-dom'
import { Spring, animated } from 'react-spring';
import {Form} from 'react-bootstrap'
import Axios from 'axios';
import ClockLoader from "react-spinners/ClockLoader";
import { IoChevronBack } from 'react-icons/io5'

class Home extends Component{
    
    constructor(props) {
        super(props);

    //Initial State
        this.state = ({
            
            username: "",
            password: "",

            userCaptcha: "",
            loginDisplay: true,
            capChaDisplay: false,
            btnDisplay: false,
            redirect: false,
            isValid: false,
            loading: true,
            error: ""
        });
    
        this.handleLogin = this.handleLogin.bind(this);
        this.handleCaptcha = this.handleCaptcha.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleKeyPressSubmit = this.handleKeyPressSubmit.bind(this);
        this.onChangeTextfield = this.onChangeTextfield.bind(this);
        this.handleKeyPressLogin = this.handleKeyPressLogin.bind(this);
        this.clockLoading = this.clockLoading.bind(this);


        // timer will set to time out for clockLoader after 4 seconds
        this.timer = setTimeout(this.clockLoading, 3000);
    }

    // The timer is unmounter after finished
    componentWillUnmount() {
        clearTimeout(this.timer);
    }
    
    clockLoading(){
        this.setState({
            loading: false
        });
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
        let random = Math.random().toString(36).substring(7);
        this.setState({
            captcha: random
        })
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
            let random = Math.random().toString(36).substring(7);
            this.setState({
                captcha: random
            })
            document.getElementById("loginButton").click();
        }
    }

    handleCaptcha(e){
        let userCaptcha = e.target.value
        if(!userCaptcha)
            return;
            this.setState({
                btnDisplay: false,
                userCaptcha: userCaptcha,
            })

    }

    handleKeyPressSubmit(e){
        if (e.key === "Enter"){
            e.preventDefault();
            if(this.state.userCaptcha === ''){
                alert("You must enter the CAPTCHA Code provided")
                let random = Math.random().toString(36).substring(7);
                this.setState({
                    captcha: random
                })
            }else if(this.state.userCaptcha != this.state.captcha){
                alert("Incorrect CAPTCHA, please try again")
                let random = Math.random().toString(36).substring(7);
                this.setState({
                    captcha: random
                })
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
            let random = Math.random().toString(36).substring(7);
            this.setState({
                captcha: random
            })
        }else if(this.state.userCaptcha != this.state.captcha){
            alert("Incorrect CAPTCHA, please try again")
            let random = Math.random().toString(36).substring(7);
            this.setState({
                captcha: random
            })
        }else if(this.state.userCaptcha === this.state.captcha){
            this.setState({
                redirect: true
            }) 
        }
    }


    verifyCredentials = async e =>{
        e.preventDefault();
        
        // Authenticate username and password
        await Axios.post('http://localhost:3001/Auth/Login', {
            username: this.state.username,
            password: this.state.password,
        }).then(res => {

            if(res.data.username !== this.state.username || res.data.username === ""){
                this.setState({
                    helperText: 'Wrong username and password conbination!',
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
            }
        }).catch((e) => {
            this.setState({
                error: `${e.response.status}`
            })

            if(this.state.error === '422'){
                this.setState({
                    helperText: 'Wrong username and password conbination!',
                    errorUsername: true,
                    errorPassword: true,
                    isValid: false,
                });
            }
            
        });

        
    }
    

    renderRedirect(){
        if (this.state.redirect) {
            return <Redirect to='/Dashboard' />
        }
    }

    refreshPage = () => {
        window.location.reload(false);
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
                <IoChevronBack className="Back_button_EnterCode link" onClick={this.refreshPage}/>
            </div>
        ) 
    }

    renderLogin(){
        return(
            <div>
                <Form onKeyPress={this.handleKeyPressLogin} onSubmit={this.verifyCredentials}>    

                    <div className="homePageImageContainer">
                        <img src="/images/homePageHand.png" className="homePageImageContainer" alt="Hand holding tray"/>
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
            
            // Clock loading page
            if(this.state.loading){
                return (
                    <ClockLoader color={"#F4F1F2"} loading={this.clockLoading} size={150} />
                )
            }
            
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