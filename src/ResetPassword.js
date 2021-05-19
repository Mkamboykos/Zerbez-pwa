import React from 'react'
import {Link} from 'react-router-dom'

/*   ResetPassword.js is rendered in App.js    */

function ResetPassword() {
    return(
        <div>
            <h1>Reset Password</h1>

            <button className="submit_button_ResetPassword"><Link to="/" className="link">Submit</Link></button>
        </div>
    )
}

export default ResetPassword;