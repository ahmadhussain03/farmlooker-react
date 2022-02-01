import {
  Switch,
} from "react-router-dom";

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import AuthRoute from "./components/routes/AuthRoute";
import GuestRoute from "./components/routes/GuestRoute";

import Login from "./screens/Login";
import Plans from "./screens/Plans";
import SignUp from './screens/SignUp';
import Dashboard from "./screens/Dashboard";
import VerifyEmail from './screens/VerifyEmail';
import VerifiedRoute from './components/routes/VerifiedRoute';
import Subscribe from "./screens/Subscribe";

const App = () => {

  return (    
      <>
        <Switch>
          {/* <GuestRoute exact path="/" component={Landing}></GuestRoute> */}
          <GuestRoute exact path="/" component={SignUp}></GuestRoute>
          <GuestRoute exact path="/login" component={Login}></GuestRoute>
          <AuthRoute exact path="/verify-email" component={VerifyEmail}></AuthRoute>
          <VerifiedRoute path="/dashboard" component={Dashboard}></VerifiedRoute>
          <VerifiedRoute path="/plans" component={Plans}></VerifiedRoute>
          <VerifiedRoute path="/subscribe" component={Subscribe}></VerifiedRoute>
        </Switch>
        <ToastContainer />
      </>
  );
}

export default App;
