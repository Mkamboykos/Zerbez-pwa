import React from 'react'
import {Link} from 'react-router-dom'
import {UserAuthenticator} from '../../Helpers/UserAuthenticator'
import {IoChevronBack} from 'react-icons/io5'

function Schedule() {
  
    const user = UserAuthenticator();

    return(
        <div>
            {user.renderPage === true ? 
                <div>
                    <h1>Shift Schedule</h1>
                    <Link to={`/dashboard/${user.info.username}`} className="link"><IoChevronBack className="Back_button"/></Link>
                    <br></br>
                    <button className="Plus_button_FloorPlan"><Link to={`/dashboard/${user.info.username}`} className="link">Plus</Link></button>
                </div>
            : ''}
        </div>
    )
}

export default Schedule;