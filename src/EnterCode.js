import React from 'react'
import {Link} from 'react-router-dom'

/*   EnterCode.js is rendered in App.js    */

function EnterCode() {
    return(
        <div>
            <h1>Enter Code</h1>
            <button className="continue_button_EnterCode"><Link to="/ResetPassword" className="link">continue</Link></button>
            
        </div>
    )
}

export default EnterCode;