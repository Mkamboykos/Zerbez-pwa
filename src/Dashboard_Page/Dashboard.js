import React, { useState } from 'react'
import {Link} from 'react-router-dom'
import { SettingsBar } from "./SettingsBar"
import { useSpring } from "react-spring"
import { GoThreeBars } from "react-icons/go"
import { animated } from "react-spring";

/*   Dashboard.js is rendered in App.js    */



function Dashboard() {

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
            <button className="Dashboard_button_FloorPlan"><Link to="/FloorPlan " className="link"><b>FLOOR PLAN</b></Link></button>
            <button className="Dashboard_button_NewReservation"><Link to="/NewReservation" className="link"><b>New Reservation</b></Link></button>
            <button className="Dashboard_button_Reserations"><Link to="/Reservations" className="link"><b>Reservations</b></Link></button>
            <button className="Dashboard_button_ShiftSchedule"><Link to="/ShiftSchedule" className="link"><b>SHIFT SCHEDULE</b></Link></button>
            <button className="Dashboard_button_AssignTables"><Link to="/ShiftSchedule" className="link"><b>ASSIGN TABLES</b></Link></button>
            <button className="Dashboard_button_TimePerCover"><Link to="/TimePerCover" className="link"><b>TIME PER COVER</b></Link></button>
            <button className="Dashboard_button_EndShift"><Link to="/" className="link"><b>END OF SHIFT</b></Link></button>
        </animated.div>
)

    return(
        <div className="Dashboard">
                <div>
                    {MenuButtonsVisible && <MenuButtons style={MenuButtonAnimation}/>}
                    {MenuVisible && <SettingsBar style={MenuAnimation}/>}
                    <GoThreeBars  className="menu-button" onClick={() => setMenuVisible(!MenuVisible) & setMenuBottonsVisible(!MenuButtonsVisible)}/>
                </div>
        </div>
    )
}

export default Dashboard;