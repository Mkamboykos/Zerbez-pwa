import React, { useState, useEffect } from 'react'
import {Link, Redirect} from 'react-router-dom'
import { useSpring } from "react-spring"
import { GoThreeBars } from "react-icons/go"
import { animated } from "react-spring";
import Axios from 'axios';
Axios.defaults.withCredentials = true;
/*   Dashboard.js is rendered in App.js    */

function Dashboard() {

    const [authState, setAuthState] = useState({
        username: '',
        id: 0,
        role: '',
        status: null,
      });
    

    useEffect(() => {
        Axios.get('http://localhost:3001/Auth/Login')
        .then((res) => {
            console.log(res.data)
            if (res.data.LoggedIn) {
                setAuthState({...authState,
                    username: res.data.username,
                    id: res.data.id,
                    role: res.data.role,
                    status: res.data.LoggedIn,
                })
            }else{
                setAuthState({ ...authState, status: false });
            }
          });
      }, [JSON.stringify(authState)]);


    function checkUser(){
        if (authState.status === true){
            return
        } else if (authState.status === false){
            return <Redirect to="/"/>
        }
    }

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
                        <a href="/Help">Help</a>
                    </li>
                    <li className="menu-list-item menu-list-item--right">
                        <a href="/About">About</a>
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
            <Link to="/" className="link"><button className="Dashboard_button_EndShift"><b>END OF SHIFT</b></button></Link>
        </animated.div>
    )

    return(
        <div>
            {checkUser()}
            <div>
                {MenuButtonsVisible && <MenuButtons style={MenuButtonAnimation}/>}
                {MenuVisible && <SettingsBar style={MenuAnimation}/>}
                <GoThreeBars  className="menu-button" onClick={() => setMenuVisible(!MenuVisible) & setMenuBottonsVisible(!MenuButtonsVisible)}/>
            </div>
        </div>
    )
}

export default Dashboard;