import React from 'react'
import {Link} from 'react-router-dom'

/*   ResetPassword.js is rendered in App.js    */

function ResetPassword() {
    return(
        <div>
            <h1>Reset Password</h1>

            <button className="ResetPassword_button_Back"><Link to="/" className="link">Submit</Link></button>
            <button className="ResetPassword_button_forgetPassword"><Link to="/EnterCode" className="link">continue</Link></button>

        </div>
    )
}

export default ResetPassword;