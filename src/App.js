import './App.css'

import {Route, Link} from 'react-router-dom'
import Home from './Home'
import SignUp from './SignUp'
import Dashboard from './Dashboard'
import ForgotPassword from './ForgotPassword'
import EnterCode from './EnterCode'
import ResetPassword from './ResetPassword'
import Settings from './Settings'
import Account from './Account'
import Analytics from './Analytics'
import Notifications from './Notifications'
import Help from './Help'
import About from './About'
import ShiftSchedule from './ShiftSchedule'
import AssignTables from './AssignTables'
import TimePerCover from './TimePerCover'
import FloorPlan from './FloorPlan'
import NewReservation from './NewReservation'

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
