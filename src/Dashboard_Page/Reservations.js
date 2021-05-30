import React from 'react'
import {Link} from 'react-router-dom'

/*   Reservations.js is rendered in App.js    */

function Reservations() {
    return(
        <div>
            <h1>Reservations</h1>

            <button className="Back_button_Reservations"><Link to="/Dashboard" className="link">Back</Link></button>

        </div>
    )
}

export default Reservations;