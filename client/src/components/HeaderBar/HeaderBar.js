import React, { Component } from "react";
import { connect } from 'react-redux';

import "./styles.css";

// imports for Material UI

import RaisedButton from "material-ui/RaisedButton";
import AppBar from "material-ui/AppBar";
import SelectField from "material-ui/SelectField";
import MenuItem from "material-ui/MenuItem";
import Logo from "../../images/boomtown-logo.svg";


class HeaderBar extends Component {
	state = {
		values: [],
	};

	handleChange = (event, index, values) => {
		this.setState({ values });
		console.log('poo');
	}

	menuItems(values) { // set up the selectable values of the menu
		return this.props.tags.map((tag) => (
			<MenuItem
				key={tag}
				insetChildren={true}
				checked={values && values.indexOf(tag) > -1}
				value={tag}
				primaryText={tag}
			/>
		));
	}

	render() {
		const { values } = this.state;
		return (
			<AppBar
				className="navbar"
				iconElementLeft={
					<div>
						<a href="/"><img className="navbar-logo" src={Logo} alt="The Boomtown Logo" /></a>

					</div>
				}
				title={
					<SelectField
						multiple={true}
						className="navbar-filter"
						hintText="Filter by Tag"
						value={values}
					>
						{this.menuItems(values)}
					</SelectField>
				}
				iconElementRight={
					<span>
						<RaisedButton label="My Profile" primary={true} />
						<RaisedButton
							className="navbar-logout-button"
							label="Logout"
							backgroundColor="#263238"
							labelColor="#fff"
						/>
					</span>
				}
			/>
		);
	}
}

const mapStateToProps = (state) => ({
	tags: state.items.tags,
});

export default connect(mapStateToProps)(HeaderBar);
