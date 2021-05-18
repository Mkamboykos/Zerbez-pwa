import './App.css'

import {Route, Link} from 'react-router-dom'
import Home from './Home'
import Login from './Login'
import SignUp from './SignUp'

function App() {
  return (
    <div className="App">

      {/* The Router is use to create different links for each class */}
      <Route exact path="/" component={Home} />
      <Route exact path="/SignUp" component={SignUp}/>
      <Route exact path="/Login" component={Login}/>

    </div>
  )
}

export default App;
