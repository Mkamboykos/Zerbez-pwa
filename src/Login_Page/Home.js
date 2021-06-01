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
        // <button onClick={handlePrint}>Print this out!</button>
        if(!userCaptcha)
            return;
            this.setState({
            btnDisplay: false,
            userCaptcha: userCaptcha
        })
    }

    handleLogin(){
      if(this.state.userCaptcha === this.state.captcha){
        alert("correct captcha")
        this.setState({
            redirect: true
          }) 
      }else{
        alert("incorrect captcha!!")
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
                  <Form.Group as={Row} controlId="formPlaintextEmail">
                      <Form.Label column sm="4">
                          {this.state.captcha}
                      </Form.Label>
                      <Col>
                          <Form.Control type="text" placeholder="Enter Captcha" onChange={this.handleCaptcha} />
                      </Col>
                  </Form.Group>
                  
                  <button className="Submit_button_Home" type="save" disabled={this.state.btnDisplay} onClick={this.handleLogin}>
                      Submit
                  </button>
                  {this.renderRedirect()}
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

                         <button className="signUp_button_home"><Link to="/SignUp" className="link">Sign Up</Link></button>
    
                        <button className="login_button" type="submit" onClick={this.handleSubmit}>
                            Login
                        </button>
    
                        {this.state.display? this.renderCaptcha():""}
                    </Form>
            </div>        
        );
      }
      
    }

export default Home;