import React from 'react'
import {Link} from 'react-router-dom'

/*   ResetPassword.js is rendered in App.js    */

function ResetPassword() {
    return(
        <div>
            <h1>Reset Password</h1>

            <button className="ResetPassword_button_Back"><Link to="/EnterCode" className="link">Back</Link></button>
            <br></br>
            <button className="Submit_button_forgetPassword"><Link to="/" className="link">Submit</Link></button>

        </div>
    )
}

export default ResetPassword;