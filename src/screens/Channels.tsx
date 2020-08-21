import React, { ReactElement } from "react";
import { Outlet } from "react-router-dom";

type ChannelsProps = {};

export function Channels(props: ChannelsProps): ReactElement {
  return (
    <div>
      Channels
      <br />
      <Outlet />
    </div>
  );
}
