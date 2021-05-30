import React from 'react'
import {Link} from 'react-router-dom'

function Help() {
  return(
      <div>
          <h1>Help</h1>

          <button className="Back_button_Help"><Link to="/Settings" className="link">Back</Link></button>
      </div>
  )
}

export default Help;