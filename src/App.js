import './App.css'

import {Route, Link} from 'react-router-dom'
import Home from './Login_Page/Home'
import SignUp from './Login_Page/SignUp'
import Dashboard from './Dashboard_Page/Dashboard'
import ForgotPassword from './Login_Page/ForgotPassword'
import EnterCode from './ForgotPassword_Page/EnterCode'
import ResetPassword from './ForgotPassword_Page/ResetPassword'
import Settings from './Dashboard_Page/Settings'
import Account from './Settings/Account'
import Analytics from './Settings/Analytics'
import Notifications from './Settings/Notifications'
import Help from './Settings/Help'
import About from './Settings/About'
import ShiftSchedule from './Dashboard_Page/ShiftSchedule'
import AssignTables from './Dashboard_Page/AssignTables'
import TimePerCover from './Dashboard_Page/TimePerCover'
import FloorPlan from './Dashboard_Page/FloorPlan'
import NewReservation from './Dashboard_Page/NewReservation'
import Reservations from './Dashboard_Page/Reservations'

function App() {
  return (
    <div className="App">

      {/* The Router is use to create different links for each class */}
      <Route exact path="/" component={Home} />
      <Route exact path="/SignUp" component={SignUp}/>
      <Route exact path="/Dashboard" component={Dashboard}/>
      <Route exact path="/ForgotPassword" component={ForgotPassword}/>
      <Route exact path="/EnterCode" component={EnterCode}/>
      <Route exact path="/ResetPassword" component={ResetPassword}/>
      <Route exact path="/Settings" component={Settings}/>
      <Route exact path="/Account" component={Account}/>
      <Route exact path="/Analytics" component={Analytics}/>
      <Route exact path="/Notifications" component={Notifications}/>
      <Route exact path="/Help" component={Help}/>
      <Route exact path="/About" component={About}/>
      <Route exact path="/ShiftSchedule" component={ShiftSchedule}/>
      <Route exact path="/AssignTables" component={AssignTables}/>
      <Route exact path="/TimePerCover" component={TimePerCover}/>
      <Route exact path="/FloorPlan" component={FloorPlan}/>
      <Route exact path="/NewReservation" component={NewReservation}/>
      <Route exact path="/Reservations" component={Reservations}/>

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
