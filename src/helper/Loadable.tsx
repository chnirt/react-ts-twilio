import React, { FC, PropsWithChildren, Suspense, lazy } from "react";

import { Loading } from "../components";

type LoadableProps = {
  url: string;
};

export const Loadable: FC<PropsWithChildren<LoadableProps>> = ({
  url = "",
  ...rest
}) => {
  const MyComponent = lazy(() => {
    return import(url).then(
      (m) => ({
        default: m[url.split("/").pop() || ""]
      }),
      (e) => null as never
    );
  });

  return (
    <Suspense fallback={<Loading />}>
      <MyComponent {...rest} />
    </Suspense>
  );
};
