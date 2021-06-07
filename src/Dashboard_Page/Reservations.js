import React from 'react'
import {Link} from 'react-router-dom'

import {IoChevronBack} from 'react-icons/io5'

/*   Reservations.js is rendered in App.js    */

function Reservations() {
    return(
        <div>
            <h1>Reservations</h1>
            <Link to="/Dashboard" className="link"><IoChevronBack className="Back_button_Reservations"/></Link>

        </div>
    )
}

export default Reservations;