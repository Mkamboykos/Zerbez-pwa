import React from 'react'
import {Link} from 'react-router-dom'

/*   Schedule.js is rendered in App.js    */

function Schedule() {
    return(
        <div>
            <h1>Schedule</h1>

            <button className="Back_button_Schedule"><Link to="/" className="link">Back</Link></button>
            <br></br>
            <button className="Plus_button_Schedule"><Link to="/" className="link">PLus</Link></button>

        </div>
    )
}

export default Schedule;