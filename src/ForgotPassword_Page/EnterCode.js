import React, {Component} from 'react'
import {Link, Redirect} from 'react-router-dom'

import { IoChevronBack } from 'react-icons/io5'

import {Form} from 'react-bootstrap'
import { Next } from 'react-bootstrap/esm/PageItem';
/*   EnterCode.js is rendered in App.js    */

// function EnterCode() {
//     return(
//         <div>
//             <h1>Enter Code</h1>
//             <Link to="/ForgotPassword" className="link"><IoChevronBack className="Back_button_EnterCode"/></Link>
//             <br></br>
//             <button className="continue_button_EnterCode"><Link to="/ResetPassword" className="link">continue</Link></button>
//         </div>
//     )
// }

// export default EnterCode;

class EnterCode extends Component{
    
    constructor(props) {
        super(props);

    //Initial State
        this.state = ({
            one: "",
            two: "",
            three: "",
            four: ""
        });
        
        this.handleOne = this.handleOne.bind(this);
        this.handleTwo = this.handleTwo.bind(this);
        this.handleThree = this.handleThree.bind(this);
        this.handleFour = this.handleFour.bind(this);
        this.handleContinue = this.handleContinue.bind(this);
        this.handleKeyPressContinue = this.handleKeyPressContinue.bind(this);
    }
    

    //Class Properties (Events On Change)
    handleOne(e){
        const re = /^[0-9\b]+$/;
        const index = e.currentTarget.dataset.index;
        if (e.target.value === '' || re.test(e.target.value)) {
            let one = e.target.value;
            this.setState({
                one: one
            }) 
        }
        if (e.target.value.length >= e.target.getAttribute("maxlength")) {
            e.target.nextElementSibling.focus();
        }
    }
    

    handleTwo(e){
        const re = /^[0-9\b]+$/;
        const index = e.currentTarget.dataset.index;
        if (e.target.value === '' || re.test(e.target.value)) {
            let two = e.target.value;
            this.setState({
                two: two
            })
        }
        if (e.target.value.length >= e.target.getAttribute("maxlength")) {
            e.target.nextElementSibling.focus();
        }
    }

    handleThree(e){
        const re = /^[0-9\b]+$/;
        if (e.target.value === '' || re.test(e.target.value)) {
            let three = e.target.value;
            this.setState({
                three: three
            })
        }
        if (e.target.value.length >= e.target.getAttribute("maxlength")) {
            e.target.nextElementSibling.focus();
        }
    }

    handleFour(e){
        const re = /^[0-9\b]+$/;
        if (e.target.value === '' || re.test(e.target.value)) {
            let four = e.target.value;
            this.setState({
                four: four
            })
        }
    }

    handleContinue(){
        if(this.state.one === '' 
            || this.state.two === '' 
            || this.state.three === ''
            || this.state.four === ''){
                alert("Missing or Invalid Code")
                return;
        }else if(this.state.one === this.state.one 
            && this.state.two === this.state.two
            && this.state.three === this.state.three
            && this.state.four === this.state.four){
            this.setState({
                redirect: true
            }) 
        }
    }

    handleKeyPressContinue(e){
        if (e.key === "Enter"){
            if(this.state.one === '' 
                || this.state.two === '' 
                || this.state.three === ''
                || this.state.four === ''){
                    return;
            }else if(this.state.one === this.state.one 
                && this.state.two === this.state.two
                && this.state.three === this.state.three
                && this.state.four === this.state.four){
                this.setState({
                    redirect: true
                }) 
            }
        }
    }

    renderRedirect(){
        if (this.state.redirect){
            return <Redirect to='/ResetPassword'/>
        }
    }
    
    
    render() {
        return (
            <div>
                <Link to="/ForgotPassword" className="link"><IoChevronBack className="Back_button_EnterCode"/></Link>
                <div className="forgotPasswordTitleContainer">
                    <h1 className="forgotTitleText"><b>Enter Code</b></h1>
                </div>
                <div>
                    <Form onKeyPress={this.handleKeyPressContinue}>
                        <div className="forgotPasswordTextContainer">
                            <p className="forgotPasswordText">
                            Enter the 4 digit code that you received on your email.
                            </p>
                        </div>

                        <Form.Group className="codeBarContainer">
                            
                            <Form.Control type="text" maxLength="1" className="codeOneBarText"   onChange={this.handleOne} />
                            <Form.Control type="text" maxLength="1" className="codeTwoBarText"   onChange={this.handleTwo} />
                            <Form.Control type="text" maxLength="1" className="codeThreeBarText" onChange={this.handleThree} />
                            <Form.Control type="text" maxLength="1" className="codeFourBarText"  onChange={this.handleFour} />
                        </Form.Group>

                        <button className="continue_button_forgotPassword" type="submit"  onClick={this.handleContinue} >
                            <b>CONTINUE</b>
                        </button>
                        {this.renderRedirect()}
                    </Form>
                </div>
            </div>        
        );
      }
    }

export default EnterCode;