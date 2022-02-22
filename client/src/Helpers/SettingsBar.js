import React from "react";
import { animated } from "react-spring";
import Axios from 'axios';
import {Mode} from '../Mode/Mode';
Axios.defaults.withCredentials = true;

const mode = Mode()

const logoutButton = async (user) => {
    try {
        await Axios.post(`${mode}/Auth/logout/${user}`)
    }catch(e){
         console.log(e)
    }
}

export const SettingsBarDashboard = ({user, style}) => (
    <animated.div className="menu menu--right" style={style}>
        <nav>
            <ul className="menu-list menu-list--right">
                <li className="menu-list-item menu-list-item--right homeButton">
                    <a href="/" className="disabledCursor" onClick={(event) => event.preventDefault()} style={{color: "#E95554"}}>Home</a>
                </li>
                <li className="menu-list-item menu-list-item--right">
                    <a href={`/Account/${user}`}>Account</a>
                </li>
                <li className="menu-list-item menu-list-item--right">
                    <a href={`/Analytics/${user}`}>Analytics</a>
                </li>
                <li className="menu-list-item menu-list-item--right">
                    <a href={`/Notifications/${user}`}>Notifications</a>
                </li>
                <li className="menu-list-item menu-list-item--right">
                    <a href={`/About/${user}`}>About</a>
                </li>
                <li className="menu-list-item menu-list-item--right">
                    <a href="/login"  onClick={() => logoutButton()}>Logout</a>
                </li>
            </ul>    
        </nav>
    </animated.div>
)
