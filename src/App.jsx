import {
  Switch,
} from "react-router-dom";

import AuthRoute from "./components/routes/AuthRoute";
import GuestRoute from "./components/routes/GuestRoute";

import SignUp from './screens/SignUp';
import Login from "./screens/Login";
import Dashboard from "./screens/Dashbo\ard";
import VerifyEmail from './screens/VerifyEmail';
import VerifiedRoute from './components/routes/VerifiedRoute';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {

  return (    
      <>
        <Switch>
          <GuestRoute exact path="/" component={SignUp}></GuestRoute>
          <GuestRoute exact path="/login" component={Login}></GuestRoute>
          <AuthRoute exact path="/verify-email" component={VerifyEmail}></AuthRoute>
          <VerifiedRoute path="/dashboard" component={Dashboard}></VerifiedRoute>
        </Switch>
        <ToastContainer />
      </>
  );
}

export default App;
