import React from 'react'
import {Link} from 'react-router-dom'

/*   FloorPlan.js is rendered in App.js    */

function FloorPlan() {
    return(
        <div>
            <h1>Floor Plan</h1>

            <button className="Back_button_FloorPlan"><Link to="/Dashboard" className="link">Back</Link></button>
            <br></br>
            <button className="Plus_button_FloorPlan"><Link to="/" className="link">Plus</Link></button>

        </div>
    )
}

export default FloorPlan;