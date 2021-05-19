import React from 'react'
import {Link} from 'react-router-dom'

/*   ForgotPassword.js is rendered in App.js    */

function ForgotPassword() {
    return(
        <div>
            <h1>Forgot Password?</h1>

            <button className="continue_button_forgetPassword"><Link to="/EnterCode" className="link">continue</Link></button>

            
        </div>
    )
}

export default ForgotPassword;