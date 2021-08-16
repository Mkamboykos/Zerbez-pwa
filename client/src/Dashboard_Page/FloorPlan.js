import React from 'react'
import {Link} from 'react-router-dom'

import {IoChevronBack} from 'react-icons/io5'

/*   FloorPlan.js is rendered in App.js    */

function FloorPlan() {
    return(
        <div>
            <h1>Floor Plan</h1>
            <Link to="/Dashboard" className="link"><IoChevronBack className="Back_button_FloorPlan"/></Link>
            <br></br>
            <button className="Plus_button_FloorPlan"><Link to="/" className="link">Plus</Link></button>

        </div>
    )
}

export default FloorPlan;