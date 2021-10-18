import React, {Component} from 'react'
import {Link, Redirect} from 'react-router-dom'
import { Spring, animated } from 'react-spring';
import {Form} from 'react-bootstrap'
import Axios from 'axios';
// import ClockLoader from "react-spinners/ClockLoader";
import { IoChevronBack } from 'react-icons/io5';
import Cookies from 'js-cookie'

Axios.defaults.withCredentials = true;



// const hasAccess = async (accessToken, refreshToken) => {

//     console.log("has access     " + accessToken, refreshToken)
//     if (!refreshToken){
//         return null;
//     }

//     if (accessToken === undefined) {
//         // generate new accessToken
//         accessToken = await refresh(refreshToken);
//         return accessToken;
//     }
//     return accessToken;
// };




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
        // this.requestLogin = this.requestLogin.bind(this);
        // this.refresh = this.refresh.bind(this);
        // this.clockLoading = this.clockLoading.bind(this);


        // timer will set to time out for clockLoader after 4 seconds
        // this.timer = setTimeout(this.clockLoading, 3000);
    }

    // The timer is unmounter after finished
    // componentWillUnmount() {
    //     //clearTimeout(this.timer);
    // }

    // componentDidMount(){
    //     Axios.get('http://localhost:3001/Auth/Login')
    //         .then(response => {
    //             console.log(response.data);
    //             if (response.data.LoggedIn === true){
    //                 return <Redirect push to="./Dashboard"/>
    //             }else if(response.data.LoggedIn === false){
    //                 console.log("No user logged in!");
    //             }
    //         })
    // }
    
    // clockLoading(){
    //     this.setState({
    //         loading: false
    //     });
    // }







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
// refresh = e => {
//         console.log("Refreshing token!");
//         let refreshToken = localStorage.getItem('refresh');
    
//         return new Promise((resolve, reject) => {
//             Axios.post('http://localhost:3001/Auth/refresh', { token: refreshToken })
//                 .then(data => {
//                     if (data.data.success === false) {
//                         console.log("Login again");
//                         // set message and return.
//                         resolve(false);
//                     } else {
//                         const { accessToken } = data.data;
//                         Cookies.set("access", accessToken);
//                         resolve(accessToken);
//                     }
//                 });
//             });
//         };
//     hasAccess = async e => {
//         let accessToken = localStorage.getItem('access');
//         let refreshToken = localStorage.getItem('refresh');
//         console.log("has access     " + accessToken, refreshToken)
//         if (!refreshToken){
//             return null;
//         }
    
//         if (accessToken === undefined) {
//             // generate new accessToken
//             accessToken = await this.refresh;
//             return accessToken;
//         }
//         return accessToken;
//     };

    

// requestLogin = async e => {
//     let accessToken = localStorage.getItem('access');
//     let refreshToken = localStorage.getItem('refresh');
//     return new Promise((resolve, reject) => {
//         Axios.post('http://localhost:3001/Auth/protected',
//             {headers: {authorization: 'Bearer ' + accessToken}})
//             .then(async res => {
//                 console.log(res);
//                 if (res.data.success === false) {
//                     if (res.data.message === "User not authenticated") {
//                         console.log("Login again");
//                         // set err message to login again.
//                     } else if (res.data.message === "Access token expired") {
//                         const accessToken = await this.refresh;
//                         return await this.requestLogin;
//                     }
//                     resolve(false);
//                 } else {
//                     // protected route has been accessed, response can be used.
//                     console.log("Protected route accessed!");
//                     resolve(true);
//                 }
//             });
//     });
// };

    handleSubmit = async e =>{
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

            // let accessToken = localStorage.getItem('accessToken');
            // let accessToken = Cookies.get('access');
            await Axios.get('http://localhost:3001/Auth/Login')
            .then(res => {
                console.log(res.data);
                if (res.data.LoggedIn === true){
                    this.setState({
                        redirect: true
                    }) 
                }else {
                    // localStorage.removeItem('accessToken');
                    // Axios.post('http://localhost:3001/Auth/token', {
                    //     username: this.state.username
                    // })
                    // .then(res => {
                    //     console.log(res.data);
                    // })
                    console.log("need to refresh token");
                }
            })

            // let accessToken = Cookies.get('access');
            // let refreshToken = Cookies.get('refresh');

            // let accessToken = localStorage.getItem('access');
            // let refreshToken = localStorage.getItem('refresh');


            // const access = await hasAccess(accessToken, refreshToken);

            // console.log(access);
            // if (!access) {
            //     // Set message saying login again.
            //     console.log("log in again!")
            // } else {
            //     const result = await this.requestLogin;
            //     console.log(result);
            //     if(result){
            //         this.setState({
            //             redirect: true
            //         })
            //     }
            // }
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
                    helperText: 'Wrong username and password conbination!',
                    errorUsername: true,
                    errorPassword: true,
                    isValid: false,
                });
            }else{

                // Cookies.set('access', res.data.accessToken);
                // Cookies.set('refresh', res.data.refreshToken);

                // localStorage.setItem('access', res.data.accessToken);
                // localStorage.setItem('refresh', res.data.refreshToken);
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
            // if(this.state.loading){
            //     return (
            //         <ClockLoader color={"#F4F1F2"} loading={this.clockLoading} size={150} />
            //     )
            // }
            
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