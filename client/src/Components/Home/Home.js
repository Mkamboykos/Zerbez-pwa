import React from 'react'
import {Link} from 'react-router-dom'

function Home() {



    return(
        <div>
            <div className='Home_Menu_Container'>
                <div className='Home_Menu_Items_Left'>
                    {/* logo here */}
                </div>

                <div className='Home_Menu_Items_Right'>
                    <button className="transparent no-border"><Link to={`/About`} className="link Home_Menu_Item_Text">About</Link></button> 
                    <button className='transparent no-border' ><Link to={`/login`} className="link Home_Menu_Item_Text">Login</Link></button>
                </div>
            </div>






            
        </div>
        
    )
}

export default Home;