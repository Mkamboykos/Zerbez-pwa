import React from 'react'
import {Link} from 'react-router-dom'

import {IoChevronBack} from 'react-icons/io5'

function TimePerCover() {
  return(
      <div>
          <h1>Time Per Cover</h1>
          <Link to="/Dashboard" className="link"><IoChevronBack className="Back_button_TimePerCover"/></Link>
      </div>
  )
}

export default TimePerCover;