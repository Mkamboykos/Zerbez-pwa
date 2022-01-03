import React, {Component} from 'react'
import {Link, Navigate} from 'react-router-dom'
import {Form, InputGroup} from 'react-bootstrap';
import Axios from 'axios';
import { IoChevronBack} from 'react-icons/io5';
import {FaRegUser, FaKey} from 'react-icons/fa';
import {RiLockPasswordLine} from 'react-icons/ri';
import homeLogoA from '../../Icons/homeLogo.svg';

Axios.defaults.withCredentials = true;

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
            btnDisplay: true,
            redirect: false,
            isValid: false,
            loading: true,
            error: "",
            count: 3,
            user: ""
        });
    }

    onChangeTextfield = (e) =>{
        let field = e.target.name;
        let value = e.target.value;
        this.setState({
            [field]: value,
            errorUsername: false,
            errorPassword: false,
            errorCaptcha: false,
            helperText: '',
            btnDisplay: false,
        });
    }

    handleCaptcha = (e) =>{
        let userCaptcha = e.target.value
        if(!userCaptcha)
            return;
            this.setState({
                btnDisplay: false,
                userCaptcha: userCaptcha,
            })
    }

    refreshPage = () => {
        window.location.reload(false);
    }

    handleLogin = () =>{
        let random = Math.random().toString(36).substring(7);
        this.setState({
            captcha: random
        })
    }

    handleKeyPressLogin = (e) =>{
        // Validators for username and password when Enter key is pressed
        if (e.key === "Enter"){
            e.preventDefault()
            this.handleLogin()
            document.getElementById("loginButton").click();
        }
    }

    verifyCredentials = async e =>{
        e.preventDefault();
        
        // Authenticate username and password
        await Axios.post('http://localhost:3001/Auth/Login', {
            username: this.state.username,
            password: this.state.password,
        }).then(res => {
            console.log(res.data);
            if(res.data.auth !== true || res.data === ""){
                this.setState({
                    helperText: 'Wrong username or password combination!',
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
        }).catch(error => {
            this.setState({
                error: `${error}`
            })
            if(this.state.error !== ''){
                this.setState({
                    helperText: 'Wrong username or password combination!',
                    errorUsername: true,
                    errorPassword: true,
                    isValid: false,
                });
            }
        });
    }

    handleSubmit = (e) =>{
        e.preventDefault();

        if(this.state.count === 0){
            
            // reset count to 3
            this.setState({
                count: 3
            })  

            //refresh page
            this.refreshPage()
        }
        
        if(this.state.userCaptcha === '' && this.state.count !== 0){

            this.setState((prevState, props) => ({
                count: prevState.count - 1
            }));

            let random = Math.random().toString(36).substring(7);
            this.setState({
                captcha: random,
                helperText: `You have ${this.state.count} attempts left!`,
                errorCaptcha: true,
            });
        }else if(this.state.userCaptcha !== this.state.captcha && this.state.count !== 0){
            
            this.setState((prevState, props) => ({
                count: prevState.count - 1
            }));

            let random = Math.random().toString(36).substring(7);
            this.setState({
                captcha: random,
                helperText: `You have ${this.state.count} attempts left!`,
                errorCaptcha: true,
            })
        }else if(this.state.userCaptcha === this.state.captcha){

            Axios.get('http://localhost:3001/Auth/Login')
            .then(res => {
                if (res.data.LoggedIn === true){
                    this.setState({
                        redirect: true,
                        user: res.data.username
                    });
                }else if (res.data.message === "Tokens not present"){
                    this.refreshPage()
                }
            })
        }
    }

    handleKeyPressSubmit = (e) =>{
        if (e.key === "Enter"){
            this.handleSubmit(e)
        }
    }

    renderRedirect = () =>{
        if (this.state.redirect === true) {
            return <Navigate  to={'/Dashboard/'+ this.state.user}  />
        }
    }

    renderCaptcha = () =>{
        return(
            <div className="homePageContainer" >
                <div className="HomePageTitleContainer">
                    <h1 className="homeTitleTimeText"><b>Time</b></h1>
                    <h1 className="homeTitleWaiterText"><b>Waiter</b></h1>
                </div>
            
                <div className="captchaContainer transitionCaptchaContainer">
                    <Form onKeyPress={this.handleKeyPressSubmit} >
                        <div className="inputContainer">  
                            <Form.Group  className="contentBar">
                                <Form.Label className="captchaText">
                                    {this.state.captcha}
                                </Form.Label>

                                <InputGroup>
                                    <InputGroup.Text><FaKey/></InputGroup.Text>
                                    <Form.Control 
                                        type="text" 
                                        className="contentBarText"
                                        placeholder="Enter Captcha" 
                                        onChange={this.handleCaptcha} 
                                        isInvalid={this.state.errorCaptcha}
                                        style={{borderTopRightRadius: '25px', borderBottomRightRadius: '25px', borderBottomLeftRadius: 0, borderTopLeftRadius: 0, display: 'inline-grid', width: '89%'}}
                                    />
                                    <div className="invalid-tooltip" style={{position: 'static', marginTop: '0.3rem', width: 'fit-content'}}>
                                        <span>{this.state.helperText}</span>
                                    </div>
                                </InputGroup> 
                            </Form.Group>

                            <div className="input_and_login_Container">
                                <button className="Submit_button_Home" type="save" id="loginButton" disabled={this.state.btnDisplay} onClick={this.handleSubmit}> <b>SUBMIT</b> </button>
                            </div>

                            {this.renderRedirect()}
                        </div>
                    </Form>
                    <IoChevronBack className="Back_button link" onClick={this.refreshPage}/>
                </div>
            </div>
        ) 
    }

    renderLogin = () =>{
        return(
            <div className="homePageContainer">
                <div className="HomePageTitleContainer">
                    <h1 className="homeTitleTimeText"><b>Time</b></h1>
                    <h1 className="homeTitleWaiterText"><b>Waiter</b></h1>
                </div>

                <img src={homeLogoA} alt=""  className="homePageImageContainer" loading="lazy"/>
                
                <Form onKeyPress={this.handleKeyPressLogin} onSubmit={this.verifyCredentials}>    
                    <div className="inputContainer">  
                        <Form.Group className="contentBar">
                            <InputGroup>
                                <InputGroup.Text><FaRegUser/></InputGroup.Text>
                                <Form.Control 
                                    type="username" 
                                    placeholder="Username"
                                    name="username"
                                    value={this.state.username}
                                    className="contentBarText" 
                                    onChange={this.onChangeTextfield}
                                    isInvalid={this.state.errorUsername}
                                />
                            </InputGroup> 
                        </Form.Group>
                            
                        <Form.Group className="contentBar">
                            <InputGroup>
                                <InputGroup.Text><RiLockPasswordLine/></InputGroup.Text>
                                <Form.Control  
                                    type="password"  
                                    placeholder="Password"
                                    name="password"
                                    value={this.state.password}
                                    className="contentBarText"
                                    onChange={this.onChangeTextfield}
                                    isInvalid={this.state.errorPassword}
                                    style={{borderTopRightRadius: '25px', borderBottomRightRadius: '25px', borderBottomLeftRadius: 0, borderTopLeftRadius: 0}}
                                />
                                <div className="invalid-tooltip" style={{ position: 'static', marginTop: '0.3rem'}}>
                                    <span>{this.state.helperText}</span>
                                </div>
                            </InputGroup>
                        </Form.Group>
                        
                        <div className="input_and_login_Container">
                            <Link to="/SignUp" className="link"><button className="signUp_button_home"> <b>SIGN UP</b> </button></Link>
                                
                            <button className="login_button_home" type="submit" id="loginButton" disabled={this.state.btnDisplay} onClick={this.handleLogin}><b>LOGIN</b></button>
                        </div>
                        <div className="forgotPasswordContainer">
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
                <div>  
                    {this.state.loginDisplay ? this.renderLogin() : ""} 
                </div>
            )
        } else if (this.state.capChaDisplay){
            return (
                <div className="eventTransition">
                   {this.state.capChaDisplay ? this.renderCaptcha() : ""}
                </div>
            )
        }
    }
}

export default Home;