import React from 'react'
import {Link} from 'react-router-dom'

function Home() {



    return(
        <div>
            <button className="Plus_button_FloorPlan"><Link to={`/login`} className="link">Sign In</Link></button>
            <button className="Plus_button_FloorPlan"><Link to={`/customer`} className="link">Customer</Link></button>
            <button className="Plus_button_FloorPlan"><Link to={`/about`} className="link">About</Link></button>
        </div>
    )
}

export default Home;