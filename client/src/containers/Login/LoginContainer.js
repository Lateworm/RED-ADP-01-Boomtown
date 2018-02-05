import React, { Component } from "react";
import store from "../../redux/store";
import { updateAuthState } from "../../redux/modules/auth";

import { firebaseAuth } from "../../config/firebaseConfig";

import Login from "./Login";

class LoginContainer extends Component {
	constructor() {
		super();
		this.state = {
			emailInputValue: "",
			passwordInputValue: "",
			loginError: { messsage: "" }
		};
	}

	static propTypes = {};

	handleUpdateEmail = e => {
		this.setState({ emailInputValue: e.target.value });
	};

	handleUpdatePassword = e => {
		this.setState({ passwordInputValue: e.target.value });
	};

	login = () => {
		if (this.state.emailInputValue && this.state.passwordInputValue) {
			firebaseAuth
				.signInWithEmailAndPassword(
					this.state.emailInputValue,
					this.state.passwordInputValue
				)
				.then(async args => {
					await store.dispatch(updateAuthState(true));
					this.props.history.push("/items");
				})
				.catch(error => {
					var errorCode = error.code;
					var errorMessage = error.message;
					this.setState({ loginError: error });
				});
		}
	};

	render() {
		return (
			<Login
				login={this.login}
				handleUpdateEmail={this.handleUpdateEmail}
				handleUpdatePassword={this.handleUpdatePassword}
				emailInputValue={this.state.emailInputValue}
				passwordInputValue={this.state.passwordInputValue}
				loginError={this.state.loginError}
			/>
		);
	}
}

export default LoginContainer;
