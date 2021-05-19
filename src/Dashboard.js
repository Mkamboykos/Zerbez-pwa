import React from 'react'
import {Link} from 'react-router-dom'

/*   Dashboard.js is rendered in App.js    */

function Dashboard() {
    return(
        <div>
            <h1>Dashboard</h1>
            <button className="Dashboard_button_Settings"><Link to="/EnterCode" className="link">Settings</Link></button>
            <br></br>
            <button className="Dashboard_button_Floorplan"><Link to="/EnterCode" className="link">Floor Plan</Link></button>
            <br></br>
            <button className="Dashboard_button_NewReseration"><Link to="/EnterCode" className="link">New Reseration</Link></button>
            <br></br>
            <button className="Dashboard_button_Reseration"><Link to="/EnterCode" className="link">Reseration</Link></button>
            <br></br>
            <button className="Dashboard_button_Shift"><Link to="/EnterCode" className="link">Shift</Link></button>
            <br></br>
            <button className="Dashboard_button_Assing"><Link to="/EnterCode" className="link">Assing</Link></button>
            <br></br>
            <button className="Dashboard_button_EndShift"><Link to="/EnterCode" className="link">End Shit</Link></button>
            
            
        </div>
    )
}

export default Dashboard;