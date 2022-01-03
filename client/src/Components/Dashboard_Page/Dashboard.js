import React, { useState, useEffect, useRef } from 'react'
import {Link, useNavigate} from 'react-router-dom'
import { useSpring } from "react-spring"
import { GoThreeBars } from "react-icons/go"
import { animated } from "react-spring";
import Axios from 'axios';
import {UserAuthenticator} from '../../Helpers/UserAuthenticator'
Axios.defaults.withCredentials = true;

function Dashboard() {
    
    const userInfo = UserAuthenticator()
    
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
            await Axios.post(`http://localhost:3001/Auth/logout/${userInfo.authState.username}`)
        }catch(e){
             console.log(e)
        }
    }


    const SettingsBar = ({ style }) => (
        <animated.div className="menu menu--right" style={style}>
            <nav>
                <ul className="menu-list menu-list--right">
                    <li className="menu-list-item menu-list-item--right homeButton">
                        <a href="/Dashboard" style={{color: "#E95554"}}>Home</a>
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
                        <a href="/About">About</a>
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
            <Link to="/FloorPlan" className="link"><button className="Dashboard_button_FloorPlan"><b>FLOOR PLAN</b></button></Link>
            <Link to="/NewReservation" className="link"><button className="Dashboard_button_NewReservation"><b>New<br/> Reservation</b></button></Link>
            <Link to="/Reservations" className="link"><button className="Dashboard_button_Reserations"><b>Reservations</b></button></Link>
            <Link to="/ShiftSchedule" className="link"><button className="Dashboard_button_ShiftSchedule"><b>SHIFT SCHEDULE</b></button></Link>
            <Link to="/ShiftSchedule" className="link"><button className="Dashboard_button_AssignTables"><b>ASSIGN TABLES</b></button></Link>
            <Link to="/TimePerCover" className="link"><button className="Dashboard_button_TimePerCover"><b>TIME PER COVER</b></button></Link>
        </animated.div>
    )

    
    return(
        <div>
            {userInfo.renderPage === true ? 
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