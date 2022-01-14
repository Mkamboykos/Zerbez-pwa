import React, { useState } from 'react'
import {Link} from 'react-router-dom'
import { useSpring } from "react-spring"
import { GoThreeBars } from "react-icons/go"
import { animated } from "react-spring";
import {UserAuthenticator} from '../../Helpers/UserAuthenticator'
import Axios from 'axios';
import {Mode} from '../../Mode/Mode';
Axios.defaults.withCredentials = true;

function Dashboard() {
    
    const mode = Mode();
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

    const logoutButton = async (e) => {
        try {
            await Axios.post(`${mode}/Auth/logout/${user.info.username}`)
        }catch(e){
             console.log(e)
        }
    }

    const SettingsBar = ({ style }) => (
        <animated.div className="menu menu--right" style={style}>
            <nav>
                <ul className="menu-list menu-list--right">
                    <li className="menu-list-item menu-list-item--right homeButton">
                        <a href="/" className="disabledCursor" onClick={(event) => event.preventDefault()} style={{color: "#E95554"}}>Home</a>
                    </li>
                    <li className="menu-list-item menu-list-item--right">
                        <a href={`/Account/${user.info.username}`}>Account</a>
                    </li>
                    <li className="menu-list-item menu-list-item--right">
                        <a href={`/Analytics/${user.info.username}`}>Analytics</a>
                    </li>
                    <li className="menu-list-item menu-list-item--right">
                        <a href={`/Notifications/${user.info.username}`}>Notifications</a>
                    </li>
                    <li className="menu-list-item menu-list-item--right">
                        <a href={`/About/${user.info.username}`}>About</a>
                    </li>
                    <li className="menu-list-item menu-list-item--right">
                        <a href="/"  onClick={() => logoutButton()}>Logout</a>
                    </li>
                </ul>    
            </nav>
        </animated.div>
    )
  
    const MenuButtons = ({style}) => (
        <animated.div className="Dashboard_Buttons" style={style}>
            <Link to={`/FloorPlan/${user.info.username}`} className="link"><button className="Dashboard_button_FloorPlan"><b>FLOOR PLAN</b></button></Link>
            <Link to={`/NewReservation/${user.info.username}`} className="link"><button className="Dashboard_button_NewReservation"><b>New<br/> Reservation</b></button></Link>
            <Link to={`/Reservations/${user.info.username}`} className="link"><button className="Dashboard_button_Reservations"><b>Reservations</b></button></Link>
            <Link to={`/ShiftSchedule/${user.info.username}`} className="link"><button className="Dashboard_button_ShiftSchedule"><b>SHIFT SCHEDULE</b></button></Link>
            <Link to={`/AssignTables/${user.info.username}`} className="link"><button className="Dashboard_button_AssignTables"><b>ASSIGN TABLES</b></button></Link>
            <Link to={`/TimePerCover/${user.info.username}`} className="link"><button className="Dashboard_button_TimePerCover"><b>TIME PER COVER</b></button></Link>
        </animated.div>
    )

    return(
        <div>
            {user.renderPage === true ? 
                <div>
                    {MenuButtonsVisible && <MenuButtons style={MenuButtonAnimation}/>}
                    {MenuVisible && <SettingsBar style={MenuAnimation}/>}
                    <GoThreeBars  className="menu-button" onClick={() => setMenuVisible(!MenuVisible) & setMenuBottonsVisible(!MenuButtonsVisible)}/>
                </div>
            : ''}
        </div>
    )
}

export default Dashboard;