import React from 'react'
import {Link} from 'react-router-dom'

/*   ForgotPassword.js is rendered in App.js    */

function ForgotPassword() {
    return(
        <div>
            <h1>Forgot Password?</h1>

            <button className="Back_button_ForgotPassword"><Link to="/" className="link">Back</Link></button>
            <br></br>
            <button className="continue_button_ForgotPassword"><Link to="/EnterCode" className="link">continue</Link></button>

            
        </div>
    )
}

export default ForgotPassword;