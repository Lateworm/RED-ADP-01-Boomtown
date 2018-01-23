import React, { Component } from "react";
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchItemsAndUser } from '../../redux/modules/items';

import Items from "./Items";

class ItemsContainer extends Component {

	static propTypes = {
		isLoading: PropTypes.bool.isRequired,
		itemsData: PropTypes.array.isRequired, // An array of object, each item is an object
		error: PropTypes.string.isRequired
	};
	componentDidMount() {
		this.props.dispatch(fetchItemsAndUser());
	}

	render() {
		return (
			<div className="items-container">
				{/* Pass the itemsData object on to the Items function in Items.js as a prop */}
				<Items list={this.props.itemsData} />
			</div>
		);
	}

}


// connect ItemsContainer to the necessary keys from the Redux store and export the result
const mapStateToProps = (state) => ({
	isLoading: state.items.isLoading,
	itemsData: state.items.itemsData,
	error: state.items.error
});
export default connect(mapStateToProps)(ItemsContainer);