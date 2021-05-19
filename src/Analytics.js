import React from 'react'
import {Link} from 'react-router-dom'

function Analytics() {
  return(
      <div>
          <h1>Analytics</h1>

          <button className="Back_button_Analytics"><Link to="/Settings" className="link">Back</Link></button>
      </div>
  )
}

export default Analytics;