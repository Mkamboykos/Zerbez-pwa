import React from 'react'
import {Link} from 'react-router-dom'

/*   Home.js is rendered in App.js    */

function Home() {
    return(
        <div>
            <h1>Time Waiter</h1>

            <button className="signUp_button_home"><Link to="/SignUp" className="link">Sign Up</Link></button>
            <button className="login_button"><Link to="/Dashboard" className="link">Login</Link></button>
            <br></br>
            <Link to="/ForgotPassword" className="link">Forgot Password?</Link>

        </div>
    )
}

export default Home;