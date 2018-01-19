import React from "react";
import ReactDOM from "react-dom";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import registerServiceWorker from "./registerServiceWorker";
import { Provider } from 'react-redux';
import store from './redux/store';

import "./index.css";
import muiTheme from "./config/theme";

import Layout from "./components/Layout";
import Login from "./containers/Login";
import NotFound from "./containers/NotFound";
import Items from "./containers/Items";
import Profile from "./containers/Profile";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

{
  /* Router link usage (inside a Router)
import { BrowserRouter as Link } from "react-router-dom";
<Link to="/login">Log In</Link> <Link to="/">Home</Link> */
}

const Boomtown = () => (
	<MuiThemeProvider muiTheme={muiTheme}>
		<Provider store={store}>
			<Router>
				<Layout>


					<Switch>
						<Route exact path="/login" component={Login} />
						<Route exact path="/" component={Items} />

						<Route exact path="/profile/:userid" component={Profile} />

						{/* <Route exact path="/share" component={} /> */}
						<Route path="*" component={NotFound} />
					</Switch>


				</Layout>
			</Router>

		</Provider>

	</MuiThemeProvider>
);

ReactDOM.render(<Boomtown />, document.getElementById("root"));
registerServiceWorker();
