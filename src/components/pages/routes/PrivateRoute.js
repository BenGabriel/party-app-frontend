import React, { useContext } from "react";
import AuthContext from "../../../context/authContext/AuthContext";
import { Redirect, Route } from "react-router-dom";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { userAuth } = useContext(AuthContext);
  return (
    <Route
      {...rest}
      render={(props) =>
        !userAuth ? <Redirect to="/login" /> : <Component {...props} />
      }
    />
  );
};

export default PrivateRoute;
