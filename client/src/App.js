import './index.css'

import React, {lazy, Suspense} from 'react'
import {Route, Routes} from 'react-router-dom'
import { SpinnerDotted } from 'spinners-react';

const Home = lazy(() => import('./Components/Login_Page/Home'))
const SignUp = lazy(() => import('./Components/Login_Page/SignUp'))
const Dashboard = lazy(() => import('./Components/Dashboard_Page/Dashboard'))
const ForgotPassword = lazy(() => import('./Components/ForgotPassword_Page/ForgotPassword'))
const ResetPassword = lazy(() => import('./Components/ForgotPassword_Page/ResetPassword'))
const Account = lazy(() => import('./Components/Settings/Account'))
const Analytics = lazy(() => import('./Components/Settings/Analytics'))
const Notifications = lazy(() => import('./Components/Settings/Notifications'))
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
          <Routes>
            <Route exact path="/" element={<Home/>}/>
            <Route exact path="/SignUp" element={<SignUp/>}/>
            <Route exact path="/Dashboard/:username" element={<Dashboard/>}/>
            <Route exact path="/ForgotPassword" element={<ForgotPassword/>}/>
            <Route exact path="/ResetPassword" element={<ResetPassword/>}/>
            <Route exact path="/Account" element={<Account/>}/>
            <Route exact path="/Analytics" element={<Analytics/>}/>
            <Route exact path="/Notifications" element={<Notifications/>}/>
            <Route exact path="/About" element={<About/>}/>
            <Route exact path="/ShiftSchedule" element={<ShiftSchedule/>}/>
            <Route exact path="/AssignTables" element={<AssignTables/>}/>
            <Route exact path="/TimePerCover" element={<TimePerCover/>}/>
            <Route exact path="/FloorPlan" element={<FloorPlan/>}/>
            <Route exact path="/NewReservation" element={<NewReservation/>}/>
            <Route exact path="/Reservations" element={<Reservations/>}/>
            <Route exact path="/Privacy" element={<Privacy/>}/>
            <Route exact path="/Terms" element={<Terms/>}/>
            <Route exact path="/404" element={<NotFound/>}/>
          </Routes>
        </Suspense>
    </div>
  )
}

export default App;