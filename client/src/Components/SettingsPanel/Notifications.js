import React, { useState } from 'react'
import {UserAuthenticator} from '../../Helpers/Authenticator'
import Axios from 'axios';
import { useSpring } from "react-spring"
import { GoThreeBars } from "react-icons/go"
import { animated } from "react-spring";
import {Mode} from '../../Mode/Mode';
Axios.defaults.withCredentials = true;

function Notifications() {

    const mode = Mode();
    const user = UserAuthenticator();

    const [NotificationsButtonsVisible, setNotificationsButtonsVisible] = useState(true);
    const [MenuVisible, setMenuVisible] = useState(false);

    const NotificationsButtonsAnimation = useSpring({
        opacity: NotificationsButtonsVisible ? 1 : 0,
        transform: NotificationsButtonsVisible ? `flash(0%)` : `flash(100%)`
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
                        <a href={`/dashboard/${user.info.username}`}>Home</a>
                    </li>
                    <li className="menu-list-item menu-list-item--right">
                        <a href={`/Account/${user.info.username}`}>Account</a>
                    </li>
                    <li className="menu-list-item menu-list-item--right">
                    <a href={`/Analytics/${user.info.username}`}>Analytics</a>
                    </li>
                    <li className="menu-list-item menu-list-item--right">
                        <a href="/" className="disabledCursor" onClick={(event) => event.preventDefault()} style={{color: "#E95554"}}>Notifications</a>
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

    const NotificationsButtons = ({style}) => (
        <animated.div className="Dashboard_Buttons" style={style}>
            <h1>NOTIFICATIONS</h1>

        </animated.div>
    )

    return(
        <div>
            {user.renderPage === true ? 
                <div>
                    {NotificationsButtonsVisible && <NotificationsButtons style={NotificationsButtonsAnimation}/>}
                    {MenuVisible && <SettingsBar style={MenuAnimation}/>}
                    <GoThreeBars  className="menu-button" onClick={() => setMenuVisible(!MenuVisible) & setNotificationsButtonsVisible(!NotificationsButtonsVisible)}/>
                </div>
            : ''}
        </div>
    )
}


export default Notifications;