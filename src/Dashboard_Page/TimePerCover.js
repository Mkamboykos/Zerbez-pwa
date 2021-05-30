import React from 'react'
import {Link} from 'react-router-dom'

function TimePerCover() {
  return(
      <div>
          <h1>Time Per Cover</h1>

          <button className="Back_button_TimePerCover"><Link to="/Dashboard" className="link">Back</Link></button>
      </div>
  )
}

export default TimePerCover;