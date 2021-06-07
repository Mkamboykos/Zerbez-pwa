import React from 'react'
import {Link} from 'react-router-dom'

import {IoChevronBack} from 'react-icons/io5'

function Settings() {
  return(
      <div>
          <h1>Settings</h1>
          <Link to="/Dashboard" className="link"><IoChevronBack className="Back_button_Settings"/></Link>
          <br></br>
          <button className="Account_button_Settings"><Link to="/Account" className="link">Account</Link></button>
          <br></br>
          <button className="Analytics_button_Settings"><Link to="/Analytics" className="link">Analytics</Link></button>
          <br></br>
          <button className="Notifications_button_Settings"><Link to="/Notifications" className="link">Notifications</Link></button>
          <br></br>
          <button className="Help_button_Settings"><Link to="/Help" className="link">Help</Link></button>
          <br></br>
          <button className="About_button_Settings"><Link to="/About" className="link">About</Link></button>

      </div>
  )
}

export default Settings;