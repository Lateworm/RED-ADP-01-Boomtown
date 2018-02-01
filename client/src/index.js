import React from "react";
import ReactDOM from "react-dom";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import registerServiceWorker from "./registerServiceWorker";
import { Provider } from "react-redux";
import store from "./redux/store";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";

import "./index.css";
import muiTheme from "./config/theme";

import { firebaseAuth } from "./config/firebaseConfig";
import { updateAuthState } from "./redux/modules/auth";
import { userLoading } from "./redux/modules/auth";

// import React components
import Layout from "./components/Layout";
import Login from "./containers/Login";
import NotFound from "./containers/NotFound";
import Items from "./containers/Items";
import Profile from "./containers/Profile";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

// import Apollo
import { ApolloProvider } from "react-apollo";
import client from "./config/apolloClient";

let gotProfile = false;
store.subscribe(() => {
  const values = store.getState();
  if (!values.authentication !== "LOADING_USER" && !gotProfile) {
    gotProfile = true;
    store.dispatch(userLoading(false));
    // there's 3 states that the authentication variable can be in: loading, true, or false.
  }
});

firebaseAuth.onAuthStateChanged(user => {
  console.log("checking for user...");

  if (user) {
    store.dispatch(updateAuthState(true));
  } else {
    store.dispatch(updateAuthState(false));
  }
});

const Boomtown = () => (
  <MuiThemeProvider muiTheme={muiTheme}>
    <ApolloProvider client={client}>
      <Provider store={store}>
        <Router>
          <Layout>
            <Switch>
              <Route exact path="/" component={Login} />
              <PrivateRoute exact path="/items" component={Items} />
              <Route exact path="/login" component={Login} />

              <Route exact path="/profile/:userid" component={Profile} />

              {/* <Route exact path="/share" component={} /> */}
              <Route path="*" component={NotFound} />
            </Switch>
          </Layout>
        </Router>
      </Provider>
    </ApolloProvider>
  </MuiThemeProvider>
);

ReactDOM.render(<Boomtown />, document.getElementById("root"));
registerServiceWorker();
