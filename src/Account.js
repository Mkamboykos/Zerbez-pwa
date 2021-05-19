import React from 'react'
import {Link} from 'react-router-dom'

function Account() {
  return(
      <div>
          <h1>Account</h1>

          <button className="Back_button_Account"><Link to="/Settings" className="link">Back</Link></button>
          
      </div>
  )
}

export default Account;