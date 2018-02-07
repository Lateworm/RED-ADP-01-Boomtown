import React, { Component } from "react";
import PropTypes from "prop-types";
import Profile from "./Profile";
import { graphql } from "react-apollo";
import gql from "graphql-tag";

class ProfileContainer extends Component {
	render() {
		const { loading, user } = this.props.data;
		return loading ? (
			<p>Loading...</p>
		) : (
			<Profile items={user.shareditems} user={user} />
		);
	}

	static propTypes = {
		data: PropTypes.object.isRequired
	};
}

// GraphQL query - the returned data becomes the 'user' in Profile.js
const fetchItems = gql`
	query getUser($id: ID) {
		user(id: $id) {
			fullname
			bio
			email
			shareditems {
				available
				borrower {
					id
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
			borroweditems {
				id
			}
		}
	}
`;

export default graphql(fetchItems, {
	options: ({ match }) => ({ variables: { id: match.params.userid } })
})(ProfileContainer);
