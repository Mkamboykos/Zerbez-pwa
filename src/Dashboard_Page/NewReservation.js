import React from 'react'
import {Link} from 'react-router-dom'

import {IoChevronBack} from 'react-icons/io5'

/*   NewReservation.js is rendered in App.js    */

function NewReservation() {
    return(
        <div>
            <h1>New Reservation</h1>
            <Link to="/Dashboard" className="link"><IoChevronBack className="Back_button_NewReservation"/></Link>

        </div>
    )
}

export default NewReservation;