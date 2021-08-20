import { Route, Redirect } from "react-router-dom";
import React from "react";
import { connect } from "react-redux";

import AnimatedRoute from "./AnimatedRoute";

const GuestRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props =>
        !rest.loggedIn ? (
          <AnimatedRoute>
            <Component {...props} />
          </AnimatedRoute>
        ) : (
          <Redirect
            to={{
              pathname: "/dashboard",
              state: { from: props.location }
            }}
          />
        )
      }
    />
  );
};

const mapStateToProps = state => {
  return {
    loggedIn: state.auth.loggedIn
  };
};

export default connect(mapStateToProps)(GuestRoute);