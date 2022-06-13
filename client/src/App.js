import Home from './pages/home/Home'
import Profile from './pages/profile/Profile'
import Register from "./components/register/Register";
import Login from "./components/login/Login";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import { useContext } from 'react';
import { AuthContext } from './context/AuthContext';


function App() {
  const {user} =useContext(AuthContext)
  return (
    <Router>
      <Switch>
        <Route exact path='/'>
          {user?<Home/>:<Login/>}
        </Route>
        <Route exact path='/profile/:username'>
          <Profile/>
        </Route>
        <Route exact path='/login'>
          {user ? <Redirect to="/"/> : <Login/>}
        </Route>
        <Route exact path='/register'>
        {user ? <Redirect to="/"/> : <Register/>}
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
