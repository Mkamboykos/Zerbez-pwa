import React from 'react'
import {Link} from 'react-router-dom'

import {IoChevronBack} from 'react-icons/io5'

function ShiftSchedule() {
  return(
      <div>
          <h1>Shift Schedule</h1>
          <Link to="/Dashboard" className="link"><IoChevronBack className="Back_button_ShiftSchedule"/></Link>
      </div>
  )
}

export default ShiftSchedule;