import React, {Component} from 'react'
import {Link, Redirect} from 'react-router-dom'

import {Button, Row, Col, Form} from 'react-bootstrap'


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
        if (!this.state.username && !this.state.password){
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
            if (!this.state.username && !this.state.password){
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
            if(this.state.userCaptcha === this.state.captcha){
                this.setState({
                    redirect: true
                }) 
            }else if(this.state.userCaptcha != this.state.captcha){
                alert("Incorrect CAPTCHA, please try again")
            }else{
                alert("You must enter the CAPTCHA Code provided")
            }
        }
    }

    handleSubmit(e){
        e.preventDefault();
        if(this.state.userCaptcha === this.state.captcha){
            this.setState({
                redirect: true
            }) 
        }else if(this.state.userCaptcha != this.state.captcha){
            alert("Incorrect CAPTCHA, please try again")
        }else{
            alert("You must enter the CAPTCHA Code provided")
        }
    }

    renderRedirect(){
        if (this.state.redirect) {
            return <Redirect to='/Dashboard' />
        }
      }
    
    renderCaptcha(){
          return(
              <div>
                  <br></br>
                <Form onKeyPress={this.handleKeyPressSubmit}>
                  <Form.Group controlId="formPlaintextEmail">
                      <Form.Label className="captchaText">
                          {this.state.captcha}
                      </Form.Label>
                      <Col>
                          <Form.Control type="text" placeholder="Enter Captcha" onChange={this.handleCaptcha} />
                      </Col>
                  </Form.Group>
                  
                  <button className="Submit_button_Home" type="save" disabled={this.state.btnDisplay} onClick={this.handleSubmit} >
                      Submit
                  </button>
                  {this.renderRedirect()}
                </Form>
            </div>
        ) 
    }
    
    render() {
        return (
            <div>
                <div className="HomePageTitleContainer">
                    <h1 className="homeTileTimeText"><b>Time</b></h1>
                    <h1 className="homeTileWaiterText"><b>Waiter</b></h1>
                </div>
                <div>
                    <Form onKeyPress={this.handleKeyPressLogin}>
                        <Form.Group className="usernameBar">
                                <Form.Control type="username" placeholder="Username"  onChange={this.handleUsername}/>
                        </Form.Group>

                        <Form.Group className="passwordBar">
                            <Form.Control type="password"  placeholder="Password"  onChange={this.handlePassword} />
                        </Form.Group>

                        <button className="signUp_button_home"><Link to="/SignUp" className="link">Sign Up</Link></button>
                        
                        <button className="login_button" type="submit"  onClick={this.handleLogin} >
                            Login
                        </button>

                        <br></br>

                        <div className="forgotpasswordContainer">
                            <Link to="/ForgotPassword" className="link"><b>Forgot Password?</b></Link>
                        </div>

                        {this.state.display? this.renderCaptcha():""}
                    </Form>
                </div>
            </div>        
        );
      }
    }

export default Home;