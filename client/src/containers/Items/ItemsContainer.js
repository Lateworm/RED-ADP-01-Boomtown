import React, { Component } from "react";
import PropTypes from "prop-types";
import Items from "./Items";
import { graphql } from "react-apollo";
import { compose } from "react-apollo"; // https://www.apollographql.com/docs/react/basics/setup.html#compose
import gql from "graphql-tag";
import { connect } from "react-redux";

class ItemsContainer extends Component {
	render() {
		const { loading, items } = this.props.data;
		return loading ? (
			<p>Loading...</p>
		) : (
			<Items list={items} filters={this.props.filters} />
		);
	}

	static propTypes = {
		filters: PropTypes.object.isRequired,
		data: PropTypes.object.isRequired // An array of object, each item is an object
	};
}

const fetchItems = gql`
	query {
		items {
			available
			borrower {
				id
				fullname
			}
			description
			id
			imageurl
			itemowner {
				bio
				email
				fullname
				id
			}
			tags {
				id
				title
			}
			title
		}
	}
`;

const mapStateToProps = state => ({
	filters: state.filters
});

export default compose(graphql(fetchItems), connect(mapStateToProps))(
	ItemsContainer
);
