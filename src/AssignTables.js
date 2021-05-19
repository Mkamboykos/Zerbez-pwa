import React from 'react'
import {Link} from 'react-router-dom'

function AssignTables() {
  return(
      <div>
          <h1>Assign Tables</h1>

          <button className="Back_button_AssignTables"><Link to="/Dashboard" className="link">Back</Link></button>
      </div>
  )
}

export default AssignTables;