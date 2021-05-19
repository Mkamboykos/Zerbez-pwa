import React from 'react'
import {Link} from 'react-router-dom'

/*   FloorPlan.js is rendered in App.js    */

function FloorPlan() {
    return(
        <div>
            <h1>Reset Password</h1>

            <button className="Back_button_FloorPlan"><Link to="/" className="link">Back</Link></button>
            <br></br>
            <button className="Plus_button_forgetPassword"><Link to="/" className="link">PLus</Link></button>

        </div>
    )
}

export default FloorPlan;