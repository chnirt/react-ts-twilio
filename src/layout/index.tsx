import React, { PropsWithChildren, Fragment } from "react";
import { Link } from "react-router-dom";

import { useAuth } from "../context/useAuth";

type Props = {};

export const Layout = ({ children }: PropsWithChildren<Props>) => {
  const { logout } = useAuth();

  function handleLogout() {
    logout?.();
  }
  return (
    <Fragment>
      <Link to="/channels">Channels</Link>|
      <Link to="/channels/123">Channel - 123</Link>
      <Link to="/channels/456">Channel - 456</Link>
      <button onClick={handleLogout}>Logout</button>
      {children}
    </Fragment>
  );
};
