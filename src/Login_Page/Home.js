import React, {Component} from 'react'
import {Link, Redirect} from 'react-router-dom'

import {Form} from 'react-bootstrap'


class Home extends Component{
    
    constructor(props) {
        super(props);

    //Initial State
        this.state = ({
            display: false,
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
                display: true,
                btnDisplay:true
            });
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
                    display: true,
                    btnDisplay:true
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
    
    render() {
        return (
            <div className="homePageContainer">
                <div className="HomePageTitleContainer">
                    <h1 className="homeTileTimeText"><b>Time</b></h1>
                    <h1 className="homeTileWaiterText"><b>Waiter</b></h1>
                </div>
                <div>
                    <Form onKeyPress={this.handleKeyPressLogin}>
                        <div className="inputContainer">

                            <div className="homePageImageContainer">
                                <p>Insert Image Here</p>
                            </div>

                            <Form.Group className="usernameBar">
                                    <Form.Control type="username" placeholder="Username" className="usernameBarText" onChange={this.handleUsername}/>
                            </Form.Group>
                        
                            <Form.Group className="passwordBar">
                                <Form.Control type="password"  placeholder="Password" className="passwordBarText" onChange={this.handlePassword} />
                            </Form.Group>
                            <div className="input_and_login_Container">
                                <button className="signUp_button_home"><Link to="/SignUp" className="link"><b>SIGN UP</b></Link></button>
                                
                                <button className="login_button_home" type="submit"  onClick={this.handleLogin} >
                                    <b>LOGIN</b>
                                </button>
                            </div>

                            <div className="forgotpasswordContainer">
                                <Link to="/ForgotPassword" className="link"><b>Forgot Password?</b></Link>
                            </div>
                        </div>

                        {this.state.display? this.renderCaptcha():""}
                    </Form>
                </div>
            </div>        
        );
      }
    }

export default Home;