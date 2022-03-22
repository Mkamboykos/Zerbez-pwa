import React from 'react'
import {Link} from 'react-router-dom'
import {UserAuthenticator} from '../../Helpers/UserAuthenticator'
import {IoChevronBack} from 'react-icons/io5'

/*   FloorPlan.js is rendered in App.js    */

function Customer() {



    return(
        <div>
            <h1>Customer</h1>
                    
            <button className="Plus_button_FloorPlan"><Link to={`/`} className="link">Home</Link></button>
        </div>
    )
}

export default Customer;