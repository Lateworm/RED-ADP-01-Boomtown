import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchItemsAndUser } from '../../redux/modules/profile';

import Profile from './Profile';

class ProfileContainer extends Component {

	static propTypes = {};
	componentDidMount() {
		this.props.dispatch(fetchItemsAndUser(this.props.match.params.userid));
	}

	render() {
		return (
			<Profile userid={this.props.match.params.userid} items={this.props.items} />
		);
	}

}

const mapStatetoProps = (state) => ({
	user: state.items.usersData
	// prob should be state.user.usersData
});

export default connect(mapStatetoProps)(ProfileContainer)