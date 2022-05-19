import React, { useState } from 'react'
import {Link} from 'react-router-dom'
import { GoThreeBars } from "react-icons/go"
import { animated, useSpring} from "react-spring";
import {UserAuthenticator} from '../../Helpers/Authenticator'
import Axios from 'axios';
import {SettingsBarDashboard} from '../../Helpers/SettingsBar';
Axios.defaults.withCredentials = true;

function Dashboard() {
    
    const user = UserAuthenticator(); // use user to access id, username, role, loggin status, and page render state
    
    const [MenuButtonsVisible, setMenuBottonsVisible] = useState(true);
    const [MenuVisible, setMenuVisible] = useState(false);

    const MenuButtonAnimation = useSpring({
        opacity: MenuButtonsVisible ? 1 : 0,
        transform: MenuButtonsVisible ? `flash(0%)` : `flash(100%)`
    });

    const MenuAnimation = useSpring({
        opacity: MenuVisible ? 1 : 0,
        transform: MenuVisible ? `flash(0%)` : `flash(100%)`
    });
  
    const MenuButtons = ({style}) => (
        <animated.div className="Dashboard_Buttons" style={style}>
            <Link to={`/floor-plan/${user.info.username}`} className="link"><button className="Dashboard_button_FloorPlan"><b>FLOOR PLAN</b></button></Link>
            <Link to={`/NewReservation/${user.info.username}`} className="link"><button className="Dashboard_button_NewReservation"><b>New<br/> Reservation</b></button></Link>
            <Link to={`/Reservations/${user.info.username}`} className="link"><button className="Dashboard_button_Reservations"><b>Reservations</b></button></Link>
            <Link to={`/schedule/${user.info.username}`} className="link"><button className="Dashboard_button_ShiftSchedule"><b>SHIFT SCHEDULE</b></button></Link>
            <Link to={`/AssignTables/${user.info.username}`} className="link"><button className="Dashboard_button_AssignTables"><b>ASSIGN TABLES</b></button></Link>
            <Link to={`/TimePerCover/${user.info.username}`} className="link"><button className="Dashboard_button_TimePerCover"><b>TIME PER COVER</b></button></Link>
        </animated.div>
    )

    return(
        <div>
            {user.renderPage === true ? 
                <div>
                    {MenuButtonsVisible && <MenuButtons style={MenuButtonAnimation}/>}
                    {MenuVisible && <SettingsBarDashboard user={user.info.username} style={MenuAnimation}/>}
                    <GoThreeBars  className="menu-button" onClick={() => setMenuVisible(!MenuVisible) & setMenuBottonsVisible(!MenuButtonsVisible)}/>
                </div>
            : ''}
        </div>
    )
}

export default Dashboard;