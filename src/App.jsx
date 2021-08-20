import {
  Switch,
} from "react-router-dom";

import AuthRoute from "./components/routes/AuthRoute";
import GuestRoute from "./components/routes/GuestRoute";

import SignUp from './screens/SignUp';
import Login from "./screens/Login";
import Dashboard from "./screens/Dashboard";

const App = () => {

  return (    
      <Switch>
        <GuestRoute exact path="/" component={SignUp}></GuestRoute>
        <GuestRoute exact path="/login" component={Login}></GuestRoute>
        <AuthRoute path="/dashboard" component={Dashboard}></AuthRoute>
      </Switch>
  );
}

export default App;
