import React from 'react'
import {Link} from 'react-router-dom'

/*   NewReservation.js is rendered in App.js    */

function NewReservation() {
    return(
        <div>
            <h1>NewReservation</h1>

            <button className="Back_button_NewReservation"><Link to="/" className="link">Back</Link></button>
            <br></br>
            <button className="Plus_button_NewReservation"><Link to="/" className="link">PLus</Link></button>

        </div>
    )
}

export default NewReservation;