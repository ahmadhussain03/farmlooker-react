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
import Subscribe from "./screens/Subscribe";
import Dashboard from "./screens/Dashboard";
import VerifyEmail from './screens/VerifyEmail';
import SubscribedRoute from "./components/routes/SubscribedRoute";
import NotSubscribedRoute from "./components/routes/NotSubscribedRoute";

const App = () => {

  return (    
      <>
        <Switch>
          {/* <GuestRoute exact path="/" component={Landing}></GuestRoute> */}
          <GuestRoute exact path="/" component={SignUp}></GuestRoute>
          <GuestRoute exact path="/login" component={Login}></GuestRoute>
          <AuthRoute exact path="/verify-email" component={VerifyEmail}></AuthRoute>
          <SubscribedRoute path="/dashboard" component={Dashboard}></SubscribedRoute>
          <NotSubscribedRoute path="/plans" component={Plans}></NotSubscribedRoute>
          <NotSubscribedRoute path="/subscribe" component={Subscribe}></NotSubscribedRoute>
        </Switch>
        <ToastContainer />
      </>
  );
}

export default App;
