import React, { useState } from "react";
import { useSpring, animated } from "react-spring";
import { GoThreeBars } from "react-icons/go"
import { IoClose } from "react-icons/io"

/*   Dashboard.js is rendered in App.js    */

function Dashboard() {

    const [rightMenuVisible, setRightMenuVisible] = useState(false);

    const MenuRight = ({ style }) => (
        <animated.div className="menu menu--right" style={style}>
            <nav>
                <ul className="menu-list menu-list--right">
                    <li className="menu-list-item menu-list-item--right">
                        <a href="/">Home</a>
                    </li>
                    <li className="menu-list-item menu-list-item--right">
                        <a href="/">About</a>
                    </li>
                    <li className="menu-list-item menu-list-item--right">
                        <a href="/">Work</a>
                    </li>
                    <li className="menu-list-item menu-list-item--right">
                        <a href="/">Contact</a>
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
        </div> 
    );
      
    }

export default Dashboard;