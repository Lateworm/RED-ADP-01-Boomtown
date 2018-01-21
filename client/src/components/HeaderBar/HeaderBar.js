import React, { Component } from "react";
import { connect } from 'react-redux';

import "./styles.css";

// imports for Material UI

import RaisedButton from "material-ui/RaisedButton";
import AppBar from "material-ui/AppBar";
import SelectField from "material-ui/SelectField";
import Logo from "../../images/boomtown-logo.svg";
import MenuItem from "material-ui/MenuItem"; // items in the select menu

class HeaderBar extends Component {
	render() {
		return (
			<AppBar
				className="navbar"
				iconElementLeft={
					<div>
						<a href="/"><img className="navbar-logo" src={Logo} alt="The Boomtown Logo" /></a>

					</div>
				}
				title={
					<SelectField // try setting this inside the title property
						multiple={true}
						className="navbar-filter"
						hintText="Filter by Tag"
					>
						<MenuItem value={1} primaryText={this.props.tags[0]} />
						<MenuItem value={2} primaryText={this.props.tags[1]} />
						<MenuItem value={3} primaryText={this.props.tags[2]} />
						<MenuItem value={4} primaryText={this.props.tags[3]} />
						<MenuItem value={5} primaryText={this.props.tags[4]} />
						<MenuItem value={6} primaryText={this.props.tags[5]} />
						<MenuItem value={7} primaryText={this.props.tags[6]} />
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
