import React from "react";
import { Route, Redirect } from "react-router-dom";
import { isAutheticated } from "./index";

const UserRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        isAutheticated() != false && isAutheticated().role === 0 ? (
          // isAutheticated() == true ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/home",
              state: { from: props.location },
            }}
          />
        )
      }
    />
  );
};

export default UserRoute;
