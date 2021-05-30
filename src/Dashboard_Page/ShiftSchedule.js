import React from 'react'
import {Link} from 'react-router-dom'

function ShiftSchedule() {
  return(
      <div>
          <h1>Shift Schedule</h1>

          <button className="Back_button_ShiftSchedule"><Link to="/Dashboard" className="link">Back</Link></button>
      </div>
  )
}

export default ShiftSchedule;