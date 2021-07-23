import React, { useState } from 'react'
import {Link} from 'react-router-dom'
import { useSpring } from "react-spring"
import { GoThreeBars } from "react-icons/go"
import { animated } from "react-spring";

function Account() {
  
    const [AccountButtonsVisible, setAccountButtonsVisible] = useState(true);
    const [MenuVisible, setMenuVisible] = useState(false);

    const AccountButtonsAnimation = useSpring({
        opacity: AccountButtonsVisible ? 1 : 0,
        transform: AccountButtonsVisible ? `flash(0%)` : `flash(100%)`
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
                        <a href="/Dashboard">Home</a>
                    </li>
                    <li className="menu-list-item menu-list-item--right">
                        <a href="/Account" style={{color: "#E95554"}}>Account</a>
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

    const AccountButtons = ({style}) => (
        <animated.div className="Dashboard_Buttons" style={style}>
            <h1>ACCOUNT</h1>

        </animated.div>
    )

    return(
        <div>
            <div>
                {AccountButtonsVisible && <AccountButtons style={AccountButtonsAnimation}/>}
                {MenuVisible && <SettingsBar style={MenuAnimation}/>}
                <GoThreeBars  className="menu-button" onClick={() => setMenuVisible(!MenuVisible) & setAccountButtonsVisible(!AccountButtonsVisible)}/>
            </div>
        </div>
    )
}

export default Account;