import {
  Switch,
} from "react-router-dom";

import AuthRoute from "./components/routes/AuthRoute";
import GuestRoute from "./components/routes/GuestRoute";

import Login from "./screens/Login";
import SignUp from './screens/SignUp';
import Dashboard from "./screens/Dashboard";
import VerifyEmail from './screens/VerifyEmail';
import VerifiedRoute from './components/routes/VerifiedRoute';

const App = () => {

  return (    
      <Switch>
        {/* <GuestRoute exact path="/" component={Landing}></GuestRoute> */}
        <GuestRoute exact path="/sign-up" component={SignUp}></GuestRoute>
        <GuestRoute exact path="/login" component={Login}></GuestRoute>
        <AuthRoute exact path="/verify-email" component={VerifyEmail}></AuthRoute>
        <VerifiedRoute path="/dashboard" component={Dashboard}></VerifiedRoute>
      </Switch>
  );
}

export default App;
