import {
  Switch,
} from "react-router-dom";

import AuthRoute from "./components/AuthRoute";
import GuestRoute from "./components/GuestRoute";

import SignUp from './screens/SignUp';
import Login from "./screens/Login";
import Dashboard from "./screens/Dashboard";

const App = () => {

  return (    
      <Switch>
        <GuestRoute exact path="/" component={SignUp}></GuestRoute>
        <GuestRoute exact path="/login" component={Login}></GuestRoute>
        <AuthRoute exact path="/dashboard" component={Dashboard}></AuthRoute>
      </Switch>
  );
}

export default App;
