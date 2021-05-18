import React from 'react'
import {Link} from 'react-router-dom'

/*   SignUp.js is rendered in App.js    */

function SignUp() {
    return(
        <div>
            <h1>Sign Up</h1>

            <button className="signUp_button_two"><Link to="/DashBoard" className="link">Sign Up</Link></button>

        </div>
    )
}


export default SignUp;