import './index.css'

import React, {lazy, Suspense} from 'react'
import {Route, Routes} from 'react-router-dom'
import { SpinnerDotted } from 'spinners-react';

const Home = lazy(() => import('./Components/Home/Home'))
const Customer = lazy(() => import('./Components/Customer/Customer'))
const Login = lazy(() => import('./Components/User/Login'))
const SignUp = lazy(() => import('./Components/User/SignUp'))
const Dashboard = lazy(() => import('./Components/Dashboard/Dashboard'))
const ForgotPassword = lazy(() => import('./Components/Password/ForgotPassword'))
const ResetPassword = lazy(() => import('./Components/Password/ResetPassword'))
const Account = lazy(() => import('./Components/Dashboard/Account'))
const Analytics = lazy(() => import('./Components/Dashboard/Analytics'))
const About = lazy(() => import('./Components/Home/About'))
const Schedule = lazy(() => import('./Components/Dashboard/Schedule'))
const FloorPlan = lazy(() => import('./Components/Dashboard/FloorPlan'))
const Reservations = lazy(() => import('./Components/Dashboard/Reservations'))
const Privacy = lazy(() => import('./Components/Legal/Privacy'))
const NotFound = lazy(() => import('./Components/StatusCode/404'))


function App() {

  return (
    <div className="App">
        <Suspense fallback={<SpinnerDotted color={'#E2C044'} size={130}/>}>
          <Routes>
            <Route exact path="/" element={<Home/>}/>
            <Route exact path="/About" element={<About/>}/>
            <Route exact path="/customer" element={<Customer/>}/>
            <Route exact path="/login" element={<Login/>}/>
            <Route exact path="/sign-up" element={<SignUp/>}/>
            <Route exact path="/forgot" element={<ForgotPassword/>}/>
            <Route exact path="/reset/:username" element={<ResetPassword/>}/>
            <Route exact path="/dashboard/:username" element={<Dashboard/>}/>
            <Route exact path="/dashboard/:username/floor-plan" element={<FloorPlan/>}/>
            <Route exact path="/dashboard/:username/schedule" element={<Schedule/>}/>
            <Route exact path="/dashboard/:username/reservations" element={<Reservations/>}/>
            <Route exact path="/dashboard/:username/account" element={<Account/>}/>
            <Route exact path="/dashboard/:username/analytics" element={<Analytics/>}/>
            <Route exact path="/Privacy" element={<Privacy/>}/>
            <Route exact path="/404" element={<NotFound/>}/>
          </Routes>
        </Suspense>
    </div>
  )
}

export default App;