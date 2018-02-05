import React, { Component } from "react";
import PropTypes from "prop-types";
import Share from "./Share";

import { graphql } from "react-apollo";
import { compose } from "react-apollo"; // https://www.apollographql.com/docs/react/basics/setup.html#compose
import gql from "graphql-tag";
import { connect } from "react-redux";

class ShareContainer extends Component {
	render() {
		return <Share share={this.share} />;
	}
}

const createItem = gql`
	mutation addItem(
		$imageurl: String
		$title: String
		$description: String
		$tags: [TagInput]
	) {
		addItem(
			newItem: {
				imageurl: $imageurl
				title: $title
				description: $description
				tags: $tags
			}
		) {
			imageurl
			title
			description
			tags {
				id
				title
			}
		}
	}
`;

export default ShareContainer;
