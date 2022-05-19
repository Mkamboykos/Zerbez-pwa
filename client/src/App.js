import './index.css'

import React, {lazy, Suspense} from 'react'
import {Route, Routes} from 'react-router-dom'
import { SpinnerDotted } from 'spinners-react';

const Home = lazy(() => import('./Components/Home/Home'))
const Login = lazy(() => import('./Components/User/Login'))
const SignUp = lazy(() => import('./Components/User/SignUp'))
const Dashboard = lazy(() => import('./Components/Dashboard/Dashboard'))
const ForgotPassword = lazy(() => import('./Components/Password/ForgotPassword'))
const EnterCode = lazy(() => import('./Components/Password/EnterCode'))
const ResetPassword = lazy(() => import('./Components/Password/ResetPassword'))
const Account = lazy(() => import('./Components/SettingsPanel/Account'))
const Analytics = lazy(() => import('./Components/SettingsPanel/Analytics'))
const Notifications = lazy(() => import('./Components/SettingsPanel/Notifications'))
const About = lazy(() => import('./Components/SettingsPanel/About'))
const Schedule = lazy(() => import('./Components/Dashboard/Schedule'))
const AssignTables = lazy(() => import('./Components/Dashboard/AssignTables'))
const TimePerCover = lazy(() => import('./Components/Dashboard/TimePerCover'))
const FloorPlan = lazy(() => import('./Components/Dashboard/FloorPlan'))
const NewReservation = lazy(() => import('./Components/Dashboard/NewReservation'))
const Reservations = lazy(() => import('./Components/Dashboard/Reservations'))
const Privacy = lazy(() => import('./Components/Legal/Privacy'))
const NotFound = lazy(() => import('./Components/StatusCode/404'))


function App() {

  return (
    <div className="App">
        <Suspense fallback={<SpinnerDotted color={'#E2C044'} size={130}/>}>
          <Routes>
            <Route exact path="/" element={<Home/>}/>
            <Route exact path="/login" element={<Login/>}/>
            <Route exact path="/sign-up" element={<SignUp/>}/>
            <Route exact path="/dashboard/:username" element={<Dashboard/>}/>
            <Route exact path="/forgot" element={<ForgotPassword/>}/>
            <Route exact path="/forgot/:username/code" element={<EnterCode/>}/>
            <Route exact path="/reset/:username" element={<ResetPassword/>}/>
            <Route exact path="/floor-plan/:username" element={<FloorPlan/>}/>
            <Route exact path="/schedule/:username" element={<Schedule/>}/>
            <Route exact path="/AssignTables/:username" element={<AssignTables/>}/>
            <Route exact path="/TimePerCover/:username" element={<TimePerCover/>}/>
            <Route exact path="/NewReservation/:username" element={<NewReservation/>}/>
            <Route exact path="/Reservations/:username" element={<Reservations/>}/>
            <Route exact path="/Account/:username" element={<Account/>}/>
            <Route exact path="/Analytics/:username" element={<Analytics/>}/>
            <Route exact path="/Notifications/:username" element={<Notifications/>}/>
            <Route exact path="/About/:username" element={<About/>}/>
            <Route exact path="/Privacy" element={<Privacy/>}/>
            <Route exact path="/404" element={<NotFound/>}/>
          </Routes>
        </Suspense>
    </div>
  )
}

export default App;