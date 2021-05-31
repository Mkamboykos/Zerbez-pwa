import React, {Component} from 'react'
import {Link, Redirect} from 'react-router-dom'

import {Button, Row, Col, Card, Form} from 'react-bootstrap'

/*   Home.js is rendered in App.js    */

// function Home() {
//     return(
//         <div>
//             <h1>Time Waiter</h1>
//             <br></br>
//             <Form>
//                 <Form.Group controlId="formBasicEmail">
//                     <Form.Control type="username" placeholder="Username" />
//                 </Form.Group>

//                 <Form.Group controlId="formBasicPassword">
//                     <Form.Control type="password" placeholder="Password" />
//                     </Form.Group>
//             </Form>

//             <button className="signUp_button_home"><Link to="/SignUp" className="link">Sign Up</Link></button>
//             <button className="login_button"><Link to="/Dashboard" className="link">Login</Link></button>
//             <br></br>
//             <Link to="/ForgotPassword" className="link">Forgot Password?</Link>

//         </div>
//     )
// }

class Home extends Component{
    
    constructor(props) {
        super(props);

    //Initial State
        this.state = ({
            display: false,
            btnDisplay: false,
            username: "",
            password: "",
            captcha: "",
            userCaptcha: ""
        });
    
        this.handleUsername = this.handleUsername.bind(this);
        this.handlePassword = this.handlePassword.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleCaptcha = this.handleCaptcha.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
    
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
    
    handleSubmit(e){
        e.preventDefault();
        if (!this.state.username && !this.state.password)
            return;
        this.setState({
            display: true,
            btnDisplay:true
        });
    
        let random = Math.random().toString(36).substring(7);
        this.setState({
            captcha: random
        })
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

    handleLogin(e) {
        if (this.setState.captcha == this.setState.userCaptcha){
            redirect: "/Dashboard"
        }else{
            this.setState({ redirect: "/" });
        }
    }
    
    
    renderCaptcha(){
          return(
              <div>
                  <Form.Group as={Row} controlId="formPlaintextEmail">
                      <Form.Label column sm="4">
                          {this.state.captcha}
                      </Form.Label>
                      <Col>
                          <Form.Control type="text" placeholder="Enter Captcha" onChange={this.handleCaptcha} />
                      </Col>
                  </Form.Group>
    
                  <Button variant="primary" type="save" disabled={this.state.btnDisplay} onClick={this.handleLogin}>
                      Login
                  </Button>
              </div>
          )
      }
    
    render() {
        return (
            <div>
                <h1>Time Waiter</h1>
                    <Form>
                        <Form.Group >
                                <Form.Label>Username</Form.Label>
                                <Form.Control type="username" placeholder="Username" onChange={this.handleUsername}/>
                        </Form.Group>
    
                        <Form.Group >
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" onChange={this.handlePassword}/>
                         </Form.Group>
    
                        <Button variant="primary" type="submit" onClick={this.handleSubmit}>
                            Submit
                        </Button>
    
                        {this.state.display? this.renderCaptcha():""}
                    </Form>
            </div>        
        );
      }
      
    }

export default Home;