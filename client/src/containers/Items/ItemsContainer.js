import React, { Component } from "react";
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchItemsAndUser } from '../../redux/modules/items';

import Items from "./Items";

class ItemsContainer extends Component {

	static propTypes = {};
	componentDidMount() {
		this.props.dispatch(fetchItemsAndUser());
	}

	render() {
		return (
			<div className="items-container">
				<Items list={this.props.itemsData} />
			</div>
		);
	}

}

const mapStateToProps = (state) => ({
	isLoading: state.items.isLoading,
	itemsData: state.items.itemsData,
	error: state.items.error
});

export default connect(mapStateToProps)(ItemsContainer);