import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { fetchItemsAndUser } from "../../redux/modules/items";

import Items from "./Items";

import { graphql } from "react-apollo";
import gql from "graphql-tag";

class ItemsContainer extends Component {
  render() {
    const { loading, items } = this.props.data;
    return loading ? <p>Loading...</p> : <Items list={items} />;
  }

  static propTypes = {
    isLoading: PropTypes.bool.isRequired,
    itemsData: PropTypes.array.isRequired, // An array of object, each item is an object
    error: PropTypes.string.isRequired
  };
} // end class ItemsContainer

const fetchItems = gql`
  query {
    items {
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
  }
`;
// tags will need to be an array

// connect ItemsContainer to the necessary keys from the Redux store and export the result

export default graphql(fetchItems)(ItemsContainer);
