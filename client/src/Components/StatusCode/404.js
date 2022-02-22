import React from 'react'
import {Link} from 'react-router-dom'
import {IoChevronBack} from 'react-icons/io5'

function NotFound() {
  return(
      <div>
          <h1>404 - Page Not Found</h1>
          <Link to="/login" className="link"><IoChevronBack className="Back_button"/></Link>
      </div>
  )
}

export default NotFound;