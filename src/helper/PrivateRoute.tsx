import React, { PropsWithChildren, Fragment } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/useAuth";

type PrivateRouteProps = {};

export function PrivateRoute({
  children
}: PropsWithChildren<PrivateRouteProps>) {
  let { isAuth } = useAuth();

  return isAuth ? (
    <Fragment>{children}</Fragment>
  ) : (
    <Navigate
      to={{
        pathname: "/"
      }}
    />
  );
}
