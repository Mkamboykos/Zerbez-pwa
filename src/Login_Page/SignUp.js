import React from 'react'
import {Link} from 'react-router-dom'

import {IoChevronBack} from 'react-icons/io5'

/*   SignUp.js is rendered in App.js    */

function SignUp() {

    
    return(
        <div className="SignUp_Page_Container">
            <Link to="/" className="link"><IoChevronBack className="Back_button_SignUp"/></Link>
            <h1 className="SignUp_Page_Title">Sign Up</h1>
            

            
            <button className="signUp_button_two"><Link to="/DashBoard" className="link">SIGN UP</Link></button>
    
        </div>
    )
}


export default SignUp;