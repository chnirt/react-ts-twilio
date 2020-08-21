import React, { ReactElement, Fragment } from "react";
import { useParams } from "react-router-dom";

type ChannelProps = {};

export function Channel(props: ChannelProps): ReactElement {
  const { id } = useParams();
  return <Fragment>Channel - {id}</Fragment>;
}
