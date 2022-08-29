import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import "semantic-ui-css/semantic.min.css";
import HomeScreen from "./screens/home";
import OrganizationsScreen from "./screens/organizations";

export default function App() {
  return (
    <Router>
      <Switch>
        <Route path="/organizations">
          <OrganizationsScreen />
        </Route>
        <Route path="/">
          <HomeScreen />
        </Route>
      </Switch>
    </Router>
  );
}
