import React from 'react'
import {Link} from 'react-router-dom'

function Home() {



    return(
        <div>
            <button className="Plus_button_FloorPlan"><Link to={`/login`} className="link">Login</Link></button>
        </div>
    )
}

export default Home;