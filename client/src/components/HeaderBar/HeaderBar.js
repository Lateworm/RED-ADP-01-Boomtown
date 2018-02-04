import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import FilterMenu from "../FilterMenu";

import firebase from "firebase";

import "./styles.css";

// imports for Material UI

import RaisedButton from "material-ui/RaisedButton";
import AppBar from "material-ui/AppBar";
import Logo from "../../images/boomtown-logo.svg";

class HeaderBar extends Component {
	// https://firebase.google.com/docs/auth/web/password-auth?authuser=0
	logOut = () => {
		firebase.auth().signOut();
	};

	render() {
		return (
			<AppBar
				className="navbar"
				iconElementLeft={
					<div>
						<a href="/items">
							<img className="navbar-logo" src={Logo} alt="The Boomtown Logo" />
						</a>
					</div>
				}
				title={<FilterMenu />}
				iconElementRight={
					<span>
						<RaisedButton label="My Profile" primary={true} />
						<RaisedButton
							className="navbar-logout-button"
							label="Logout"
							backgroundColor="#263238"
							labelColor="#fff"
							onClick={this.logOut}
						/>
					</span>
				}
			/>
		);
	}
}

const mapStateToProps = state => ({
	tags: state.items.tags
});

export default connect(mapStateToProps)(HeaderBar);
