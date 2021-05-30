import React from 'react'
import {Link} from 'react-router-dom'

/*   NewReservation.js is rendered in App.js    */

function NewReservation() {
    return(
        <div>
            <h1>New Reservation</h1>

            <button className="Back_button_NewReservation"><Link to="/Dashboard" className="link">Back</Link></button>

        </div>
    )
}

export default NewReservation;