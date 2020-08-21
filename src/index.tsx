import * as React from "react";
import { render } from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";

import App from "./App";
import { AuthProvider } from "./context/useAuth";
import { TwilioProvider } from "./context/useTwilio";

const rootElement = document.getElementById("root");
render(
  <AuthProvider>
    <TwilioProvider>
      <Router>
        <App />
      </Router>
    </TwilioProvider>
  </AuthProvider>,
  rootElement
);
