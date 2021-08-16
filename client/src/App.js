import './index.css'

import {Route} from 'react-router-dom'
import Home from './Components/Login_Page/Home'
import SignUp from './Components/Login_Page/SignUp'
import Dashboard from './Components/Dashboard_Page/Dashboard'
import ForgotPassword from './Components/Login_Page/ForgotPassword'
import EnterCode from './Components/ForgotPassword_Page/EnterCode'
import ResetPassword from './Components/ForgotPassword_Page/ResetPassword'
import Account from './Components/Settings/Account'
import Analytics from './Components/Settings/Analytics'
import Notifications from './Components/Settings/Notifications'
import Help from './Components/Settings/Help'
import About from './Components/Settings/About'
import ShiftSchedule from './Components/Dashboard_Page/ShiftSchedule'
import AssignTables from './Components/Dashboard_Page/AssignTables'
import TimePerCover from './Components/Dashboard_Page/TimePerCover'
import FloorPlan from './Components/Dashboard_Page/FloorPlan'
import NewReservation from './Components/Dashboard_Page/NewReservation'
import Reservations from './Components/Dashboard_Page/Reservations'


function App() {
  return (
    <div className="App">

      {/* The Router is use to create different links for each class */}
      <Route exact path="/" component={Home}/>
      <Route exact path="/SignUp" component={SignUp}/>
      <Route exact path="/Dashboard" component={Dashboard}/>
      <Route exact path="/ForgotPassword" component={ForgotPassword}/>
      <Route exact path="/EnterCode" component={EnterCode}/>
      <Route exact path="/ResetPassword" component={ResetPassword}/>
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

// Background Color of the entire app
document.body.style = 'background: #2A3C60;';

export default App;