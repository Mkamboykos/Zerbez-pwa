import React from 'react'
import {Link} from 'react-router-dom'

import {IoChevronBack} from 'react-icons/io5'

/*   SignUp.js is rendered in App.js    */

function SignUp() {
    return(
        <div>
            <h1>Sign Up</h1>
            <Link to="/" className="link"><IoChevronBack className="Back_button_SignUp"/></Link>
            <button className="signUp_button_two"><Link to="/DashBoard" className="link">Sign Up</Link></button>

        </div>
    )
}


export default SignUp;