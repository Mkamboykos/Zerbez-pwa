import React from 'react'
import {Link} from 'react-router-dom'

function Notifications() {
  return(
      <div>
          <h1>Notifications</h1>

          <button className="Back_button_Notifications"><Link to="/Settings" className="link">Back</Link></button>
      </div>
  )
}

export default Notifications;