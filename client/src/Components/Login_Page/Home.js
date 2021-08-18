import React, {Component} from 'react'
import {Link, Redirect} from 'react-router-dom'
import { Spring, animated } from 'react-spring';

import {Form} from 'react-bootstrap'


class Home extends Component{
    
    constructor(props) {
        super(props);

    //Initial State
        this.state = ({
            loginDisplay: true,
            capChaDisplay: false,
            btnDisplay: false,
            redirect: false,
            username: "",
            password: "",
            captcha: "",
            userCaptcha: ""
        });
    
        this.handleUsername = this.handleUsername.bind(this);
        this.handlePassword = this.handlePassword.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
        this.handleCaptcha = this.handleCaptcha.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleKeyPressLogin = this.handleKeyPressLogin.bind(this);
        this.handleKeyPressSubmit = this.handleKeyPressSubmit.bind(this);
    }

    //Class Properties (Events On Change)
    handleUsername(e){
        let username = e.target.value;
        this.setState({
            username: username
        })
      }
    
    handlePassword(e){
          let password = e.target.value;
          this.setState({
            password: password
        })
    }
    
    handleLogin(e){
        e.preventDefault();
        if (this.state.username === '' && this.state.password === ''){
            alert("Username and Password cannot be empty")
            return;
        }else if(this.state.username && !this.state.password){
            alert("Missing Password")
            return;
        }else if(!this.state.username && this.state.password){
            alert("Missing Username")
        return;
        }else{
            this.setState({
                capChaDisplay: true,
                btnDisplay:true,
                loginDisplay: false
            });
            //console.log(this.state.username + " " + this.state.password)
        }    

        let random = Math.random().toString(36).substring(7);
        this.setState({
            captcha: random
        })
    }

    handleKeyPressLogin(e){
        if (e.key === "Enter"){
            e.preventDefault();
            if (this.state.username === '' && this.state.password === ''){
                alert("Username and Password cannot be empty")
                return;
            }else if(this.state.username && !this.state.password){
                alert("Missing Password")
                return;
            }else if(!this.state.username && this.state.password){
                alert("Missing Username")
                return;
            }else{
                this.setState({                    
                    capChaDisplay: true,
                    btnDisplay:true,
                    loginDisplay:false
                });
            }
            let random = Math.random().toString(36).substring(7);
            this.setState({
                captcha: random
            })
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
                          <Form.Control type="text" className="captchaBar" placeholder="Enter Captcha" onChange={this.handleCaptcha} />
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
                <Form onKeyPress={this.handleKeyPressLogin}>    

                    <div className="homePageImageContainer">
                        <p>Insert Image Here</p>
                    </div>

                    <div  className="inputContainer">  
                        <Form.Group className="usernameBar">
                            <Form.Control type="username" placeholder="Username" className="usernameBarText" onChange={this.handleUsername}/>
                        </Form.Group>
                            
                        <Form.Group className="passwordBar">
                            <Form.Control type="password"  placeholder="Password" className="passwordBarText" onChange={this.handlePassword} />
                        </Form.Group>
                        <div className="input_and_login_Container">
                            <Link to="/SignUp" className="link"><button className="signUp_button_home"><b>SIGN UP</b></button></Link>
                                
                            <button className="login_button_home" type="submit"  onClick={this.handleLogin} >
                                <b>LOGIN</b>
                            </button>
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