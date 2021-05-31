import React from 'react'
import {Link} from 'react-router-dom'

import {Form} from 'react-bootstrap'

/*   Home.js is rendered in App.js    */

function Home() {
    return(
        <div>
            <h1>Time Waiter</h1>

            <Form>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Username</Form.Label>
                    <Form.Control type="email" placeholder="Username" />
                    <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" />
                    </Form.Group>
            </Form>

            <button className="signUp_button_home"><Link to="/SignUp" className="link">Sign Up</Link></button>
            <button className="login_button"><Link to="/Dashboard" className="link">Login</Link></button>
            <br></br>
            <Link to="/ForgotPassword" className="link">Forgot Password?</Link>

        </div>
    )
}

export default Home;