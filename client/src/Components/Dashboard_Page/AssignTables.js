import React from 'react'
import {Link} from 'react-router-dom'

import {IoChevronBack} from 'react-icons/io5'

function AssignTables() {
  return(
      <div>
          <h1>Assign Tables</h1>
          <Link to="/Dashboard" className="link"><IoChevronBack className="Back_button_AssignTables"/></Link>
      </div>
  )
}

export default AssignTables;