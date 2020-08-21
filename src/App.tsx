import React from "react";
import "./styles.css";
import { useRoutes } from "react-router-dom";

import { PublicRoute, PrivateRoute, Loadable } from "./helper";
import { Channels } from "./screens";
import { Layout } from "./layout";

type AppProps = {};

export default function App(props: AppProps) {
  // We removed the <BrowserRouter> element from App because the
  // useRoutes hook needs to be in the context of a <BrowserRouter>
  // element. This is a common pattern with React Router apps that
  // are rendered in different environments. To render an <App>,
  // you'll need to wrap it in your own <BrowserRouter> element.
  let element = useRoutes([
    // A route object has the same properties as a <Route>
    // element. The `children` is just an array of child routes.
    {
      path: "/",
      element: (
        <PublicRoute>
          <Loadable url="../screens/Login" />
        </PublicRoute>
      )
    },
    {
      path: "channels",
      element: (
        <PrivateRoute>
          <Layout>
            <Channels />
          </Layout>
        </PrivateRoute>
      ),
      children: [
        {
          path: "/",
          element: <Loadable url="../screens/ChannelsIndex" />
        },
        { path: ":id", element: <Loadable url="../screens/Channel" /> },
        {
          path: "create",
          element: <Loadable url="../screens/CreateChannel" />
        }
      ]
    },
    { path: "*", element: <Loadable url="../screens/NotFound" /> }
  ]);

  return element;
}
