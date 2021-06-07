import React from 'react'
import {Link} from 'react-router-dom'

import {IoChevronBack} from 'react-icons/io5'

/*   ResetPassword.js is rendered in App.js    */

function ResetPassword() {
    return(
        <div>
            <h1>Reset Password</h1>
            <Link to="/EnterCode" className="link"><IoChevronBack className="Back_button_ResetPassword"/></Link>
            <br></br>
            <button className="Submit_button_forgetPassword"><Link to="/" className="link">Submit</Link></button>

        </div>
    )
}

export default ResetPassword;