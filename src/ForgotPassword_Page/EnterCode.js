import React from 'react'
import {Link} from 'react-router-dom'

import { IoChevronBack } from 'react-icons/io5'

/*   EnterCode.js is rendered in App.js    */

function EnterCode() {
    return(
        <div>
            <h1>Enter Code</h1>
            <Link to="/ForgotPassword" className="link"><IoChevronBack className="Back_button_EnterCode"/></Link>
            <br></br>
            <button className="continue_button_EnterCode"><Link to="/ResetPassword" className="link">continue</Link></button>
        </div>
    )
}

export default EnterCode;