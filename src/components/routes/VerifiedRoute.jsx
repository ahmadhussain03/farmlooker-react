import { Route, Redirect } from "react-router-dom";
import React from "react";
import { connect } from "react-redux";

import AnimatedRoute from "./AnimatedRoute";

const VerifiedRoute = ({ component: Component, ...rest }) => {

  return (
    <Route
      {...rest}
      render={props =>
        rest.loggedIn ? (
          rest.user?.email_verified_at !== null ? (
            <AnimatedRoute>
              <Component {...props} />
            </AnimatedRoute>
          ) : (
            <Redirect
              to={{
                pathname: "/verify-email",
                state: { from: props.location }
              }}
            />
          )
        ) : (
          <Redirect
            to={{
              pathname: "/login",
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
    loggedIn: state.auth.loggedIn,
    user: state.auth.user
  };
};
export default connect(mapStateToProps)(VerifiedRoute);