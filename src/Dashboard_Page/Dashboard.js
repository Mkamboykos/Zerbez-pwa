import React, { useState } from "react";
import { useSpring, animated } from "react-spring";
import { GoThreeBars } from "react-icons/go"
import {Link} from 'react-router-dom'


/*   Dashboard.js is rendered in App.js    */

function Dashboard() {

    const [rightMenuVisible, setRightMenuVisible] = useState(false);

    const MenuRight = ({ style }) => (
        <animated.div className="menu menu--right" style={style}>
            <nav>
                <ul className="menu-list menu-list--right">
                    <li className="menu-list-item menu-list-item--right">
                        <a href="/Dashboard">Home</a>
                    </li>
                    <li className="menu-list-item menu-list-item--right">
                        <a href="/Account">Account</a>
                    </li>
                    <li className="menu-list-item menu-list-item--right">
                        <a href="/Analytics">Analytics</a>
                    </li>
                    <li className="menu-list-item menu-list-item--right">
                        <a href="/Notifications">Notifications</a>
                    </li>
                    <li className="menu-list-item menu-list-item--right">
                        <a href="/Help">Help</a>
                    </li>
                    <li className="menu-list-item menu-list-item--right">
                        <a href="/About">About</a>
                    </li>
                </ul>
            </nav>
        </animated.div>
    ); 

    const rightMenuAnimation = useSpring({
        opacity: rightMenuVisible ? 1 : 0,
        transform: rightMenuVisible ? `flash(0)` : `flash(100%)`
    });
        
    return (
        <div className="Dashboard">
            <GoThreeBars className="menu-button" onClick={() => setRightMenuVisible(!rightMenuVisible)}>
            {rightMenuVisible ? <GoThreeBars/> : <GoThreeBars/>}
            </GoThreeBars>
          
            <MenuRight style={rightMenuAnimation} />
            <button className="Dashboard_button_FloorPlan"><Link to="/FloorPlan" className="link"><b>FLOOR PLAN</b></Link></button>
            <button className="Dashboard_button_NewReservation"><Link to="/NewReservation" className="link"><b>New Reservation</b></Link></button>
            <button className="Dashboard_button_Reserations"><Link to="/Reservations" className="link"><b>Reservations</b></Link></button>
            <button className="Dashboard_button_ShiftSchedule"><Link to="/ShiftSchedule" className="link"><b>SHIFT SCHEDULE</b></Link></button>
            <button className="Dashboard_button_AssignTables"><Link to="/ShiftSchedule" className="link"><b>ASSIGN TABLES</b></Link></button>
            <button className="Dashboard_button_TimePerCover"><Link to="/TimePerCover" className="link"><b>TIME PER COVER</b></Link></button>
            <button className="Dashboard_button_EndShift"><Link to="/" className="link"><b>END OF SHIFT</b></Link></button>
      
      </div>
    );

      
}

export default Dashboard;