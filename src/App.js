import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Dashboard from "./Dashboard";
import HomeScreen from "./screens/home";
import "semantic-ui-css/semantic.min.css";

export default function App() {
  return (
    <Router>
      <Switch>
        <Route path="/organizations">
          <Dashboard />
        </Route>
        <Route path="/">
          <HomeScreen />
        </Route>
      </Switch>
    </Router>
  );
}
