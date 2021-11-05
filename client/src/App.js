import './index.css'

import React, {lazy, Suspense} from 'react'
import {Route} from 'react-router-dom'
import { SpinnerDotted } from 'spinners-react';

const Home = lazy(() => import('./Components/Login_Page/Home'))
const SignUp = lazy(() => import('./Components/Login_Page/SignUp'))
const Dashboard = lazy(() => import('./Components/Dashboard_Page/Dashboard'))
const ForgotPassword = lazy(() => import('./Components/ForgotPassword_Page/ForgotPassword'))
const ResetPassword = lazy(() => import('./Components/ForgotPassword_Page/ResetPassword'))
const Account = lazy(() => import('./Components/Settings/Account'))
const Analytics = lazy(() => import('./Components/Settings/Analytics'))
const Notifications = lazy(() => import('./Components/Settings/Notifications'))
const Help = lazy(() => import('./Components/Settings/Help'))
const About = lazy(() => import('./Components/Settings/About'))
const ShiftSchedule = lazy(() => import('./Components/Dashboard_Page/ShiftSchedule'))
const AssignTables = lazy(() => import('./Components/Dashboard_Page/AssignTables'))
const TimePerCover = lazy(() => import('./Components/Dashboard_Page/TimePerCover'))
const FloorPlan = lazy(() => import('./Components/Dashboard_Page/FloorPlan'))
const NewReservation = lazy(() => import('./Components/Dashboard_Page/NewReservation'))
const Reservations = lazy(() => import('./Components/Dashboard_Page/Reservations'))
const Privacy = lazy(() => import('./Components/Legal/Privacy'))
const Terms = lazy(() => import('./Components/Legal/Terms'))
const NotFound = lazy(() => import('./Components/404_NotFound/NotFound'))


function App() {

  return (
    <div className="App">
        <Suspense fallback={<SpinnerDotted color={'#E2C044'} size={130}/>}>
          <Route exact path="/" component={Home}/>
          <Route exact path="/SignUp" component={SignUp}/>
          <Route exact path="/Dashboard" component={Dashboard}/>
          <Route exact path="/ForgotPassword" component={ForgotPassword}/>
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
          <Route exact path="/Privacy" component={Privacy}/>
          <Route exact path="/Terms" component={Terms}/>
          <Route exact path="/404" component={NotFound}/>
        </Suspense>
    </div>
  )
}

// Background Color of the entire app
document.body.style = 'background: linear-gradient(to top left, #823f5c, #016474) fixed';

export default App;