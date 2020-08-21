import React, { PropsWithChildren, Fragment } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/useAuth";

type PublicRouteProps = {};

export function PublicRoute({ children }: PropsWithChildren<PublicRouteProps>) {
  let { isAuth } = useAuth();

  return isAuth ? (
    <Navigate
      to={{
        pathname: "/channels"
      }}
    />
  ) : (
    <Fragment>{children}</Fragment>
  );
}
