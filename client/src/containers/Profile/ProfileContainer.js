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
			<Profile list={this.props.itemsData} userid={this.props.match.params.userid} />
		);
	}

}

const mapStatetoProps = (state) => ({
	itemsData: state.userItems.userItems, // TODO: make this path less stupid. Also, compare this against ItemsContainer and see if we need the other two props created there.
});

export default connect(mapStatetoProps)(ProfileContainer)