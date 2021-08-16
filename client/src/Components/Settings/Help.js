import React, { useState } from 'react'
import {Link} from 'react-router-dom'
import { useSpring } from "react-spring"
import { GoThreeBars } from "react-icons/go"
import { animated } from "react-spring";

function Help() {
    const [HelpButtonsVisible, setHelpButtonsVisible] = useState(true);
    const [MenuVisible, setMenuVisible] = useState(false);

    const HelpButtonsAnimation = useSpring({
        opacity: HelpButtonsVisible ? 1 : 0,
        transform: HelpButtonsVisible ? `flash(0%)` : `flash(100%)`
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
                        <a href="/Account" >Account</a>
                    </li>
                    <li className="menu-list-item menu-list-item--right">
                        <a href="/Analytics" >Analytics</a>
                    </li>
                    <li className="menu-list-item menu-list-item--right">
                        <a href="/Notifications">Notifications</a>
                    </li>
                    <li className="menu-list-item menu-list-item--right">
                        <a href="/Help" style={{color: "#E95554"}}>Help</a>
                    </li>
                    <li className="menu-list-item menu-list-item--right">
                        <a href="/About">About</a>
                    </li>
                </ul>
            </nav>
        </animated.div>
    )

    const HelpButtons = ({style}) => (
        <animated.div className="Dashboard_Buttons" style={style}>
            <h1>HELP</h1>

        </animated.div>
    )

    return(
        <div>
            <div>
                {HelpButtonsVisible && <HelpButtons style={HelpButtonsAnimation}/>}
                {MenuVisible && <SettingsBar style={MenuAnimation}/>}
                <GoThreeBars  className="menu-button" onClick={() => setMenuVisible(!MenuVisible) & setHelpButtonsVisible(!HelpButtonsVisible)}/>
            </div>
        </div>
    )
}

export default Help;