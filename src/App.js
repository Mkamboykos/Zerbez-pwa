import './App.css'

import {Route, Link} from 'react-router-dom'
import Home from './Home'
import SignUp from './SignUp'
import Dashboard from './Dashboard'
import ForgotPassword from './ForgotPassword'

function App() {
  return (
    <div className="App">

      {/* The Router is use to create different links for each class */}
      <Route exact path="/" component={Home} />
      <Route exact path="/SignUp" component={SignUp}/>
      <Route exact path="/Dashboard" component={Dashboard}/>
      <Route exact path="/ForgotPassword" component={ForgotPassword}/>

    </div>
  )
}

// Background Color
document.body.style = 'background: #2A3C60;';

export default App;




/* 
Class name : Home.js   <--- do not include inside class

import React from 'react'
import {Link} from 'react-router-dom'

function Home() {
  return(
      <div>
          <h1>Time Waiter</h1>

          <Link to="/SignUp">Sign Up</Link>
          <br></br>
          <Link to="/Dashboard">Login</Link>
          <br></br>
          <Link to="/ForgotPassword">Forgot Password?</Link>

      </div>
  )
}

export default Home;

*/
