import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const isAuth = useSelector((state) => state.auth.isAuth);
  const loading = useSelector((state) => state.auth.isLoading);

  if (loading) {
    return <h1>Wait pliz</h1>;
  } else {
    if (!isAuth) {
      return <Redirect to="/" />;
    }
    return <Route component={Component} {...rest} />;
  }
};

export default PrivateRoute;
