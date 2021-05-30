import React from 'react'
import {Link} from 'react-router-dom'

/*   Dashboard.js is rendered in App.js    */

function Dashboard() {
    return(
        <div>
            <h1>Dashboard</h1>
            <button className="Dashboard_button_Settings"><Link to="/Settings" className="link">Settings</Link></button>
            <br></br>
            <button className="Dashboard_button_FloorPlan"><Link to="/FloorPlan" className="link">Floor Plan</Link></button>
            <br></br>
            <button className="Dashboard_button_NewReservation"><Link to="/NewReservation" className="link">New Reseration</Link></button>
            <br></br>
            <button className="Dashboard_button_Reseration"><Link to="/Reservations" className="link">Reserations</Link></button>
            <br></br>
            <button className="Dashboard_button_ShiftSchedule"><Link to="/ShiftSchedule" className="link">Shift Schedule</Link></button>
            <br></br>
            <button className="Dashboard_button_AssignTables"><Link to="/AssignTables" className="link">Assing Tables</Link></button>
            <br></br>
            <button className="Dashboard_button_TimePerCover"><Link to="/TimePerCover" className="link">Time Per Cover</Link></button>
            <br></br>
            <button className="Dashboard_button_EndShift"><Link to="/" className="link">End Shit</Link></button>
            
            
        </div>
    )
}

export default Dashboard;