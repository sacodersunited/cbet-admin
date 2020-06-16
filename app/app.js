import React from "react";
import { Route, Switch, Router, Link } from "react-router-dom";
import Dashboard from "./Dashboard";
import history from "./CbetHistory";

const FourOhFour = () => (
  <div>
    <h1>Page not found</h1>
    <p>
      Go back to <Link to="/">Dashboard</Link>.
    </p>
  </div>
);

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoadingIndicatorDone: true,
      selectClassName: "main-content", // used in SideNav hide to change class of content
    };
  }

  render() {
    return (
      <Router history={history}>
        <div id="main-content">
          <div className="grid-row grid-gap">
            <Switch>
              <Route exact path="/" render={(props) => <Dashboard />} />
              ​
              <Route component={FourOhFour} />
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
