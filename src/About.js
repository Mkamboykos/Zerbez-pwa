import React from 'react'
import {Link} from 'react-router-dom'

function About() {
  return(
      <div>
          <h1>About</h1>

          <button className="Back_button_About"><Link to="/Settings" className="link">Back</Link></button>
      </div>
  )
}

export default About;