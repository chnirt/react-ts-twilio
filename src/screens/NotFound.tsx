import React, { PropsWithChildren, ReactElement } from "react";
import { useNavigate } from "react-router-dom";

type NotFoundProps = {};

export function NotFound(
  props: PropsWithChildren<NotFoundProps>
): ReactElement {
  let navigate = useNavigate();

  return (
    <div>
      NotFound
      <button onClick={() => navigate("/")}>Back</button>
    </div>
  );
}
